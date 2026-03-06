import Link from "next/link";
import { Event } from "@/lib/data";

type Props = {
    event : Event;
};

export default function EventItem({event}:Props){
    return (
        <li>
            <Link href={`/events/${event.id}`}>
                {event.title}
            </Link>
        </li>
    );
}
