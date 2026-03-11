//【PAGE(Client)-活動詳細頁】
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

  //報名
  const handleRegister = async () => {
    console.log("eventId = ",eventId);

    if (!eventId) return;

    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await fetch(`/api/events/${ eventId }/register`, {
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

    console.log("res",res);

    if (!res.ok) {
      alert("操作失敗");
      setLoading(false);
      return;
    }

    const data = await res.json();
    console.log("報名API data = ", data);
    setEvent(data);
    setLoading(false);
    alert("報名完成!");
  };

  //取消報名
  const handleCancel = async () => {

    if (!eventId) return;

    setLoading(true);

    const token = localStorage.getItem("token");

    const res = await fetch(`/api/events/${ eventId }/cancel`, {
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
    console.log("取消報名API data = ", data);
    setEvent(data);
    setLoading(false);
    alert("已取消報名!");
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
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
