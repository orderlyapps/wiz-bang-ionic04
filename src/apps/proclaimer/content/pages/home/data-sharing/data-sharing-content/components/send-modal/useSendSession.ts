import { useEffect, useRef, useState } from "react";
import { createPeerConnection } from "@util/vendor/webrtc/peer-connection";
import { sendOverDataChannel, waitForDataChannelOpen } from "@util/vendor/webrtc/data-channel";
import { rxdb } from "@shared/database/rxdb/database";
import type { SharePayload } from "@util/vendor/webrtc/share-payload";

const SESSION_TIMEOUT_SECONDS = 120;

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function generateDeviceId(): string {
  return crypto.randomUUID();
}

export type SendSessionStatus = "waiting" | "connected" | "disconnected" | "expired" | "error";

export interface UseSendSessionResult {
  code: string;
  seconds_remaining: number;
  status: SendSessionStatus;
  error_message: string | null;
  sendPublisherData: () => Promise<number>;
}

export function useSendSession(is_open: boolean): UseSendSessionResult {
  const [code, setCode] = useState(() => generateCode());
  const [session_key, setSessionKey] = useState(0);
  const [seconds_remaining, setSecondsRemaining] = useState(SESSION_TIMEOUT_SECONDS);
  const [status, setStatus] = useState<SendSessionStatus>("waiting");
  const [error_message, setErrorMessage] = useState<string | null>(null);

  const peer_ref = useRef<ReturnType<typeof createPeerConnection> | null>(null);
  const data_channel_ref = useRef<RTCDataChannel | null>(null);
  const timer_ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!is_open) return;
    setCode(generateCode());
    setSessionKey((key) => key + 1);
  }, [is_open]);

  useEffect(() => {
    if (!is_open) return;

    setStatus("waiting");
    setSecondsRemaining(SESSION_TIMEOUT_SECONDS);
    setErrorMessage(null);

    const device_id = generateDeviceId();
    const peer = createPeerConnection({
      session_id: code,
      device_id,
      onSubscribed: () => {
        peer.signaling.send({ type: "ready", from_device_id: device_id });
      },
      onPeerReady: () => {
        void peer_ref.current?.startNegotiation();
      },
      onConnected: () => {
        setStatus("connected");
        if (timer_ref.current) clearInterval(timer_ref.current);
      },
      onDisconnected: () => {
        setStatus((prev) => {
          if (prev === "connected") return "disconnected";
          if (prev === "waiting") return "expired";
          return prev;
        });
      },
      onError: (error) => {
        setStatus("error");
        setErrorMessage(error.message);
      },
    });
    peer_ref.current = peer;

    data_channel_ref.current = peer.createDataChannel("share");

    let remaining = SESSION_TIMEOUT_SECONDS;
    timer_ref.current = setInterval(() => {
      remaining -= 1;
      setSecondsRemaining(remaining);
      if (remaining <= 0) {
        clearInterval(timer_ref.current!);
        setStatus((prev) => (prev === "waiting" ? "expired" : prev));
      }
    }, 1000);

    return () => {
      if (timer_ref.current) clearInterval(timer_ref.current);
      peer.close();
      peer_ref.current = null;
      data_channel_ref.current = null;
    };
  }, [is_open, session_key, code]);

  async function sendPublisherData(): Promise<number> {
    const channel = data_channel_ref.current;
    if (!channel) throw new Error("Data channel not available");
    try {
      await waitForDataChannelOpen(channel);
      const docs = await rxdb.publisher.find().exec();
      const data = docs.map((doc) => doc.toJSON());
      const payload: SharePayload = { type: "publisher-local", data };
      sendOverDataChannel(channel, payload);
      return data.length;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send data";
      setStatus("error");
      setErrorMessage(message);
      throw new Error(message, { cause: error });
    }
  }

  return { code, seconds_remaining, status, error_message, sendPublisherData };
}
