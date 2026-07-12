import { usePublisherLocationClickHandler } from "../../hooks/usePublisherLocationClickHandler";

type PublisherLocationClickHandlerProps = {
  onSelectGroup: (group_key: string) => void;
};

export function PublisherLocationClickHandler({
  onSelectGroup,
}: PublisherLocationClickHandlerProps) {
  usePublisherLocationClickHandler({ onSelectGroup });
  return null;
}
