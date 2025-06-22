import { useEffect, useState, useRef } from "react";
import { Badge } from "primereact/badge";
import { OverlayPanel } from "primereact/overlaypanel";
import { Tag } from "primereact/tag";
import io from "socket.io-client";
import { getUnReadNotificationsByUserId } from "../services/NotificationService";

const socket = io("http://localhost:3000");

export default function ClientNotificationBell({ userId }) {
  const [unread, setUnread] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const op = useRef(null);
  const roomId = `user-${userId}`; // Room ID based on userId
  const fetchUnread = async () => {
    try {
      const res = await getUnReadNotificationsByUserId();
      setUnread(res.data.notifications);
      setUnreadCount(res.data.notifications.length);
    } catch (err) {
      console.error("Fetch unread failed:", err);
    }
  };

  useEffect(() => {
    fetchUnread();
    console.log("my room: ", roomId);
    socket.emit("join-room", roomId); // Join the user's room
    socket.on("client-notification", (data) => {
      console.log("Connected to Socket.IO server");
      console.log("Client received:", data);
      fetchUnread(); // refresh unread state
    });

    return () => {
      //socket.disconnect();
    };
  }, [userId]);

  return (
    <div>
      <i
        className="pi pi-bell p-overlay-badge cursor-pointer text-xl"
        onClick={(e) => {
          op.current.toggle(e);
          fetchUnread();
        }}
      >
        {unreadCount > 0 && <Badge value={unreadCount} severity="info" />}
      </i>

      <OverlayPanel ref={op}>
        {unread.length > 0 ? (
          <ul className="p-2">
            {unread.map((n) => (
              <li
                key={n.id}
                className="p-2 bg-yellow-100 rounded mb-2 shadow-sm"
              >
                <p className="font-semibold text-sm">{n.message}</p>
                <p className="text-xs text-gray-500">
                  {new Date(n.createdAt).toLocaleString()}
                </p>
                <div className="flex justify-end mt-2">
                  <Tag value="Unread" severity="warning" />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm">No unread notifications</p>
        )}
      </OverlayPanel>
    </div>
  );
}
