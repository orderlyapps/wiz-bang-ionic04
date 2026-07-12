const CHUNK_SIZE = 64000;

interface ChunkEnvelope {
  type: "chunk";
  chunk_index: number;
  total_chunks: number;
  data: string;
}

/**
 * Send a JSON-serializable payload over an RTCDataChannel. Large payloads are
 * split into chunks so they fit within the SCTP message buffer.
 */
export function sendOverDataChannel(channel: RTCDataChannel, payload: unknown): void {
  const message = JSON.stringify(payload);

  if (message.length <= CHUNK_SIZE) {
    channel.send(message);
    return;
  }

  const totalChunks = Math.ceil(message.length / CHUNK_SIZE);
  for (let index = 0; index < totalChunks; index++) {
    const chunk = message.slice(index * CHUNK_SIZE, (index + 1) * CHUNK_SIZE);
    const envelope: ChunkEnvelope = {
      type: "chunk",
      chunk_index: index,
      total_chunks: totalChunks,
      data: chunk,
    };
    channel.send(JSON.stringify(envelope));
  }
}

/**
 * Listen to an RTCDataChannel and invoke `onMessage` once a full JSON payload
 * has been received (handles both single messages and chunked messages).
 */
export function onDataChannelMessage<T>(
  channel: RTCDataChannel,
  onMessage: (payload: T) => void,
  onError?: (error: Error) => void,
): void {
  const chunks: Map<number, string> = new Map();
  let expectedChunks = 0;

  channel.onmessage = (event) => {
    try {
      const raw = event.data as string;
      const parsed = JSON.parse(raw) as Record<string, unknown> | unknown[];

      if (parsed && typeof parsed === "object" && "type" in parsed && parsed.type === "chunk") {
        const envelope = parsed as unknown as ChunkEnvelope;
        expectedChunks = envelope.total_chunks;
        chunks.set(envelope.chunk_index, envelope.data);

        if (chunks.size === expectedChunks) {
          let fullMessage = "";
          for (let index = 0; index < expectedChunks; index++) {
            const chunk = chunks.get(index);
            if (chunk === undefined) throw new Error(`Missing chunk ${index}`);
            fullMessage += chunk;
          }
          chunks.clear();
          expectedChunks = 0;
          onMessage(JSON.parse(fullMessage) as T);
        }
      } else {
        // Single-message payload.
        onMessage(parsed as T);
      }
    } catch (error) {
      if (onError) onError(error instanceof Error ? error : new Error(String(error)));
    }
  };
}

/**
 * Wait for a data channel to open before resolving.
 */
export function waitForDataChannelOpen(channel: RTCDataChannel, timeoutMs = 30000): Promise<void> {
  return new Promise((resolve, reject) => {
    if (channel.readyState === "open") {
      resolve();
      return;
    }
    if (channel.readyState === "closing" || channel.readyState === "closed") {
      reject(new Error("Data channel is already closed"));
      return;
    }

    const timer = setTimeout(() => reject(new Error("Data channel open timed out")), timeoutMs);

    channel.onopen = () => {
      clearTimeout(timer);
      resolve();
    };
    channel.onerror = () => {
      clearTimeout(timer);
      reject(new Error("Data channel failed to open"));
    };
  });
}
