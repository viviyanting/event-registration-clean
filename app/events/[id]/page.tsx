"use client";

import { useState } from "react";
import { events } from "@/lib/data";
import { Event } from "@/lib/data";
import { useRouter } from "next/navigation"

type PageProps = {
  params: {
    id: string;
  };
};

export default function EventDetailPage({ params }: PageProps) {
  const initialEvent = events.find((e) => e.id === params.id);

  const [event, setEvent] = useState<Event | null>(
    initialEvent ?? null
  );
  const [loading, setLoading] = useState(false);

  if (!event) return <div>找不到活動</div>;

  const router = useRouter()
  const handleRegister = async () => {
    console.log("點擊報名按鈕",event.id);
    setLoading(true);
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/events/${event.id}/register`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if(res.status===401){
        alert("請先登入")        
        router.push("/login")
        return
    }

    if(!res.ok){
      alert("操作失敗");
      setLoading(false);
      return;
    }
    
    const data = await res.json();
    console.log("API回傳資料:",data);
    setEvent(data.event); 
    setLoading(false);
  };

  const handleCancel = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/events/${event.id}/cancel`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if(!res.ok){
      alert("操作失敗");
      setLoading(false);
      return;
    }

    const data = await res.json();
    setEvent(data.event); 

    setLoading(false);
  };

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>

      {event.isRegistered ? (
        <button onClick={handleCancel} disabled={loading}>
          取消報名
        </button>
      ) : (
        <button onClick={handleRegister} disabled={loading}>
          我要報名
        </button>
      )}
    </div>
  );
}

