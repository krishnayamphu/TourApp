// pages/Notifications.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { getNotifications } from "../../services/NotificationService";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const res = await getNotifications();
    console.log("Notifications fetched:", res.data);

    setNotifications(res.data.notifications);
  };

  const toggleReadStatus = async (id) => {
    await axios.patch(`http://localhost:3000/api/notify/${id}/toggle`);
    fetchNotifications(); // refresh
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="w-4/5 mx-auto py-8">
      <h2 className="text-lg font-semibold mb-6">Admin Notifications</h2>
      <ul className="space-y-4">
        {notifications.map((n) => (
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
              <div className="flex items-center gap-2">
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
    </div>
  );
}
