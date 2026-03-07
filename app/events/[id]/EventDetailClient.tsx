
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Event } from "@/types/event";

export default function EventDetailClient({ eventId }: { eventId: string }) {

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 取得活動資料
  useEffect(() => {

    const fetchEvent = async () => {

      const token = localStorage.getItem("token");

      // console.log("eventId 內容: ",eventId);

      const res = await fetch(`/api/events/${ Number(eventId) }`, {
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : undefined
      });

      const data = await res.json();
      setEvent(data);
    };

    fetchEvent();

  }, [eventId]);

  const handleRegister = async () => {

    if (!event) return;

    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await fetch(`/api/events/${event.id}/register`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res.status === 401) {
      alert("請先登入");
      router.push("/login");
      return;
    }

    if (!res.ok) {
      alert("操作失敗");
      setLoading(false);
      return;
    }

    const data = await res.json();
    setEvent(data.event);

    setLoading(false);
  };

  const handleCancel = async () => {

    if (!event) return;

    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await fetch(`/api/events/${event.id}/cancel`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      alert("操作失敗");
      setLoading(false);
      return;
    }

    const data = await res.json();
    setEvent(data.event);

    setLoading(false);
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.content}</p>

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
