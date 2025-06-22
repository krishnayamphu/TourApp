import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { Tag } from "primereact/tag";
import { getUnReadNotifications } from "../services/NotificationService";
const socket = io("http://localhost:3000");
export default function UnReadNotification() {
  const [unread, setUnread] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const op = useRef(null);
  const fetchUnread = async () => {
    const res = await getUnReadNotifications();
    setUnread(res.data.notifications);
    setUnreadCount(res.data.notifications.length);
  };

  useEffect(() => {
    fetchUnread();
    // Listen for live updates
    socket.on("admin-notification", (data) => {
      console.log("New notification received:", data);
      fetchUnread();
    });

    return () => {
      socket.off("admin-notification");
    };
  }, []);

  return (
    <div>
      <i
        className="pi pi-bell p-overlay-badge my-4 mx-8"
        style={{ fontSize: "1.3rem" }}
        onClick={(e) => {
          op.current.toggle(e);
          fetchUnread(); // refresh on click
        }}
      >
        {unreadCount > 0 && <Badge value={unreadCount} severity="danger" />}
      </i>

      <OverlayPanel ref={op}>
        {unread.length > 0 ? (
          <ul className="p-1">
            {unread.map((n) => (
              <li
                key={n.id}
                className={`p-4 rounded shadow ${
                  n.isRead ? "bg-gray-200" : "bg-yellow-100"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-md font-medium">{n.message}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Tag
                      severity={n.isRead ? "success" : "warning"}
                      value={n.isRead ? "Read" : "Unread"}
                    />
                    <Button
                      label={n.isRead ? "Mark Unread" : "Mark Read"}
                      onClick={() => toggleReadStatus(n.id)}
                      size="small"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No unread notifications</p>
        )}
      </OverlayPanel>
    </div>
  );
}
