export type SignalMessage =
  | { type: "offer"; sdp: string; from_device_id: string }
  | { type: "answer"; sdp: string; from_device_id: string }
  | {
      type: "ice-candidate";
      candidate: string;
      sdp_mid: string | null;
      sdp_mline_index: number | null;
      from_device_id: string;
    }
  | { type: "ready"; from_device_id: string }
  | { type: "bye"; from_device_id: string };

export interface SignalingChannel {
  send(message: SignalMessage): void;
  close(): void;
}

export interface SignalingChannelOptions {
  session_id: string;
  device_id: string;
  onMessage: (message: SignalMessage) => void;
  onSubscribed?: () => void;
  onError?: (error: Error) => void;
}
