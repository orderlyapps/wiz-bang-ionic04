import { supabase } from "@util/vendor/supabase/supabase-client";
import type { SignalingChannel, SignalingChannelOptions, SignalMessage } from "./signaling-types";

function channelName(session_id: string): string {
  return `share-session:${session_id}`;
}

export function createSignalingChannel(options: SignalingChannelOptions): SignalingChannel {
  const { session_id, device_id, onMessage, onSubscribed, onError } = options;
  let subscribed = false;

  const channel = supabase.channel(channelName(session_id), {
    config: { broadcast: { self: false } },
  });

  channel
    .on("broadcast", { event: "signal" }, (payload: unknown) => {
      const message = (payload as { payload?: SignalMessage }).payload;
      if (!message) return;
      if (message.from_device_id === device_id) return;
      onMessage(message);
    })
    .subscribe((status) => {
      if (status === "SUBSCRIBED" && onSubscribed && !subscribed) {
        subscribed = true;
        onSubscribed();
      }
      if (status === "CHANNEL_ERROR" && onError) {
        onError(new Error(`Signaling channel error for session ${session_id}`));
      }
    });

  return {
    send(message: SignalMessage) {
      void channel.send({
        type: "broadcast",
        event: "signal",
        payload: { ...message, from_device_id: device_id },
      });
    },
    close() {
      void supabase.removeChannel(channel);
    },
  };
}
