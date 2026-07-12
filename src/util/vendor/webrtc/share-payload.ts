import type { PublisherLocal } from "@shared/database/rxdb/collections/publisher";

export type SharePayload =
  | {
      type: "publisher-local";
      data: PublisherLocal[];
    }
  | {
      type: "heartbeat";
    };
