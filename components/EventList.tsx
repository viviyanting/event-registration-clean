import { Event } from "@/lib/data";
import EventItem from "./EventItem";

type Props = {
    events: Event[];
};

export default function EventList({events}:Props){
    return (
        <ul>
            {events.map((event)=>(
                <EventItem key={event.id} event={event} />
            ))}
        </ul>
    );
}