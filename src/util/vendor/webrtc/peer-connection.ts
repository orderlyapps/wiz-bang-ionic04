import { createSignalingChannel } from "./signaling-channel";
import type { SignalingChannel, SignalMessage } from "./signaling-types";

export interface PeerConnectionOptions {
  session_id: string;
  device_id: string;
  onDataChannel?: (channel: RTCDataChannel) => void;
  onPeerReady?: () => void;
  onSubscribed?: () => void;
  onError?: (error: Error) => void;
  onConnected?: () => void;
  onDisconnected?: () => void;
}

export interface PeerConnectionHandle {
  pc: RTCPeerConnection;
  signaling: SignalingChannel;
  createDataChannel(label: string): RTCDataChannel;
  waitForPeerReady(): Promise<void>;
  startNegotiation(): Promise<void>;
  close(): void;
}

const ICE_SERVERS: RTCIceServer[] = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
];

export function createPeerConnection(options: PeerConnectionOptions): PeerConnectionHandle {
  const {
    session_id,
    device_id,
    onDataChannel,
    onPeerReady,
    onSubscribed,
    onError,
    onConnected,
    onDisconnected,
  } = options;

  const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
  const pendingCandidates: RTCIceCandidateInit[] = [];
  let remoteDescriptionSet = false;
  let makingOffer = false;
  let negotiationStarted = false;
  let peerReadyResolve: (() => void) | null = null;
  let peerReadyPromise: Promise<void> | null = null;

  function ensurePeerReadyPromise(): Promise<void> {
    if (!peerReadyPromise) {
      peerReadyPromise = new Promise<void>((resolve) => {
        peerReadyResolve = resolve;
      });
    }
    return peerReadyPromise;
  }

  const signaling = createSignalingChannel({
    session_id,
    device_id,
    onSubscribed,
    onMessage: async (message: SignalMessage) => {
      try {
        switch (message.type) {
          case "offer": {
            const offerCollision = makingOffer || pc.signalingState !== "stable";
            if (offerCollision) {
              // For this simple two-peer share flow we ignore the collision;
              // the sender is the only peer that creates offers.
              return;
            }
            await pc.setRemoteDescription({ type: "offer", sdp: message.sdp });
            remoteDescriptionSet = true;
            await drainPendingCandidates();
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            signaling.send({ type: "answer", sdp: answer.sdp!, from_device_id: device_id });
            break;
          }
          case "answer": {
            await pc.setRemoteDescription({ type: "answer", sdp: message.sdp });
            remoteDescriptionSet = true;
            await drainPendingCandidates();
            break;
          }
          case "ice-candidate": {
            const candidateInit: RTCIceCandidateInit = {
              candidate: message.candidate,
              sdpMid: message.sdp_mid,
              sdpMLineIndex: message.sdp_mline_index,
            };
            if (remoteDescriptionSet) {
              await pc.addIceCandidate(candidateInit);
            } else {
              pendingCandidates.push(candidateInit);
            }
            break;
          }
          case "ready": {
            if (peerReadyResolve) peerReadyResolve();
            if (onPeerReady) onPeerReady();
            break;
          }
          case "bye":
            close();
            break;
        }
      } catch (error) {
        if (onError) onError(error instanceof Error ? error : new Error(String(error)));
      }
    },
    onError,
  });

  async function drainPendingCandidates(): Promise<void> {
    while (pendingCandidates.length > 0) {
      const candidate = pendingCandidates.shift();
      if (candidate) await pc.addIceCandidate(candidate);
    }
  }

  pc.onicecandidate = (event) => {
    if (!event.candidate) return;
    signaling.send({
      type: "ice-candidate",
      candidate: event.candidate.candidate,
      sdp_mid: event.candidate.sdpMid,
      sdp_mline_index: event.candidate.sdpMLineIndex,
      from_device_id: device_id,
    });
  };

  pc.onconnectionstatechange = () => {
    if (pc.connectionState === "connected" && onConnected) onConnected();
    if (
      (pc.connectionState === "disconnected" ||
        pc.connectionState === "failed" ||
        pc.connectionState === "closed") &&
      onDisconnected
    ) {
      onDisconnected();
    }
  };

  pc.ondatachannel = (event) => {
    if (onDataChannel) onDataChannel(event.channel);
  };

  async function startNegotiation(): Promise<void> {
    if (negotiationStarted) return;
    negotiationStarted = true;
    makingOffer = true;
    try {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      signaling.send({ type: "offer", sdp: offer.sdp!, from_device_id: device_id });
    } finally {
      makingOffer = false;
    }
  }

  function createDataChannel(label: string): RTCDataChannel {
    return pc.createDataChannel(label);
  }

  async function waitForPeerReady(timeoutMs = 30000): Promise<void> {
    const timeout = new Promise<void>((_, reject) => {
      setTimeout(() => reject(new Error("Timed out waiting for peer to join")), timeoutMs);
    });
    await Promise.race([ensurePeerReadyPromise(), timeout]);
  }

  function close(): void {
    try {
      signaling.close();
    } catch {
      // Ignore cleanup errors.
    }
    try {
      pc.close();
    } catch {
      // Ignore cleanup errors.
    }
  }

  return { pc, signaling, createDataChannel, waitForPeerReady, startNegotiation, close };
}
