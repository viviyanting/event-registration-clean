"use client"
import Link from "next/link";
import { Event } from "@/types/event";
import styles from "./EventItem.module.css";


type Props = {
    event : Event;
};

export default function EventItem({event}:Props){
    const handleDetail = async () => {
        window.location.href = `/events/${event.id}`;    
    }


    return (
        <div className={styles.card}>
        <div className={styles.title}>{event.title}</div>
        <div className={styles.desc}>{event.content}</div>
            <button onClick={handleDetail} className={styles.button}>
                View Detail
            </button>
        </div>

        
    );
}
