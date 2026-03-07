import EventDetailClient from "./EventDetailClient";


type PageProps = {
  params: {
    id: string;
  };
};


async function getEventsDetail(id: string) {
  const res = await fetch(`http://localhost:3000/api/events/${id}`);
  if (!res.ok) {
    throw new Error("failed to fetch event");
  }
  return res.json();
}


export default async function EventDetailPage({ params }: PageProps) {
  
  // const event = await getEventsDetail(params.id);

  // console.log("{page} events Detail event = " ,event );


  // if (!event) {
  //   return <div>Event not found</div>;
  // }

  return <EventDetailClient eventId={params.id} />;
}

