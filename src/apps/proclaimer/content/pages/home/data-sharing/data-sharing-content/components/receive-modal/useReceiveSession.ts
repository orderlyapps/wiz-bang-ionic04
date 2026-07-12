import { useEffect, useRef, useState } from "react";
import { createPeerConnection } from "@util/vendor/webrtc/peer-connection";
import { onDataChannelMessage } from "@util/vendor/webrtc/data-channel";
import type { SharePayload } from "@util/vendor/webrtc/share-payload";

const CONNECTION_TIMEOUT_MS = 30000;

export type ReceiveSessionStatus = "idle" | "connecting" | "connected" | "disconnected" | "error";

export interface UseReceiveSessionResult {
  status: ReceiveSessionStatus;
  error_message: string | null;
  received_payload: SharePayload | null;
  connect: (code: string) => void;
  reset: () => void;
}

function generateDeviceId(): string {
  return crypto.randomUUID();
}

export function useReceiveSession(): UseReceiveSessionResult {
  const [status, setStatus] = useState<ReceiveSessionStatus>("idle");
  const [error_message, setErrorMessage] = useState<string | null>(null);
  const [received_payload, setReceivedPayload] = useState<SharePayload | null>(null);

  const peer_ref = useRef<ReturnType<typeof createPeerConnection> | null>(null);
  const timeout_ref = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearConnectionTimeout() {
    if (timeout_ref.current) {
      clearTimeout(timeout_ref.current);
      timeout_ref.current = null;
    }
  }

  function reset() {
    clearConnectionTimeout();
    peer_ref.current?.close();
    peer_ref.current = null;
    setStatus("idle");
    setErrorMessage(null);
    setReceivedPayload(null);
  }

  function connect(code: string) {
    reset();
    setStatus("connecting");

    const device_id = generateDeviceId();
    const peer = createPeerConnection({
      session_id: code,
      device_id,
      onSubscribed: () => {
        peer.signaling.send({ type: "ready", from_device_id: device_id });
      },
      onPeerReady: () => {
        // Echo ready back to the sender so a missed initial ready is recovered.
        peer.signaling.send({ type: "ready", from_device_id: device_id });
      },
      onDataChannel: (channel) => {
        onDataChannelMessage<SharePayload>(
          channel,
          (payload) => {
            setReceivedPayload(payload);
          },
          (error) => {
            setStatus("error");
            setErrorMessage(error.message);
          },
        );
      },
      onConnected: () => {
        clearConnectionTimeout();
        setStatus("connected");
      },
      onDisconnected: () => {
        clearConnectionTimeout();
        setStatus((prev) => (prev === "connected" ? "disconnected" : "idle"));
      },
      onError: (error) => {
        clearConnectionTimeout();
        setStatus("error");
        setErrorMessage(error.message);
      },
    });
    peer_ref.current = peer;

    timeout_ref.current = setTimeout(() => {
      setStatus("error");
      setErrorMessage("Connection timed out");
      peer_ref.current?.close();
      peer_ref.current = null;
    }, CONNECTION_TIMEOUT_MS);
  }

  useEffect(() => {
    return () => {
      clearConnectionTimeout();
      peer_ref.current?.close();
      peer_ref.current = null;
    };
  }, []);

  return { status, error_message, received_payload, connect, reset };
}
