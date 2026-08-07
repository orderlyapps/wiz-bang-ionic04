import { VisitingSpeakersList } from "@proclaimer-routes/pages/home/speaker/visiting-speakers/components/visiting-speakers-list/VisitingSpeakersList";

type VisitingSpeakersContentProps = {
  search: string;
};

export function VisitingSpeakersContent({ search }: VisitingSpeakersContentProps) {
  return <VisitingSpeakersList search={search} />;
}
