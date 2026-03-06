import { events } from "@/lib/data";
import EventList from "@/components/EventList";

export default function EventsPage(){
    return (
        <div>
            <h1>活動列表</h1>
            <EventList events={events}/>
        </div>
    )
}