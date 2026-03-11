//【PAGE(Server)-活動詳細頁】
import EventDetailClient from "./EventDetailClient";


type PageProps = {
  params: {
    id: string;
  };
};

export default async function EventDetailPage({ params }: PageProps) {
  return <EventDetailClient eventId={params.id} />;
}

