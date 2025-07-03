import React, { useEffect, useState, useRef } from "react";
import { FaBell } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";
import * as signalR from "@microsoft/signalr";
import useAuth from "../../hooks/useAuth.hook";
import AllNotificationsModal from "./AllNotificationsModal";

interface Notification {
  id: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
}

const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const { user: loggedInUser } = useAuth() // Adjust if you use context
  const [showAllModal, setShowAllModal] = useState(false);
  const bellRef = useRef<HTMLDivElement | null>(null);

  const fetchNotifications = async () => {
    if (!loggedInUser) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `/Notification/getNotificationsByUserId/${loggedInUser.id}`
      );    

      console.log(res.data);
      setNotifications(res.data || []);
    } catch (err) {
        console.log(err);
      // handle error
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await axiosInstance.post(
        "/Notification/markAsReadNotification",
        { notificationId, }
      );
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notificationId ? { ...n, isRead: true } : n
        )
      );
    } catch (err) {
      // handle error
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Setup SignalR connection for real-time updates
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7058/hubs/notifications")
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
    connectionRef.current = connection;
    connection.on("ReceiveNotification", (title: string, body: string) => {
      fetchNotifications();
    });
    connection
      .start()
      .catch((err) => console.error("SignalR error:", err));
    return () => {
      connection.off("ReceiveNotification");
      connection.stop();
    };
    // eslint-disable-next-line
  }, [loggedInUser]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="relative" ref={bellRef}>
      <button
        className="relative focus:outline-none"
        onClick={() => setDropdownOpen((open) => !open)}
      >
        <FaBell className="w-7 h-7 text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
            {unreadCount}
          </span>
        )}
      </button>
      {dropdownOpen && (
        <div
          className="absolute left-0 top-10 max-w-xs w-[320px] bg-white shadow-lg rounded-lg z-50 max-h-96 overflow-y-auto border border-gray-200"
          style={{ minWidth: 240 }}
        >
          <div className="p-4 border-b font-bold text-gray-700">Notifications</div>
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No notifications</div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3 border-b last:border-b-0 cursor-pointer hover:bg-blue-50 ${
                  n.isRead ? "text-gray-400" : "text-gray-900 font-semibold"
                }`}
                onClick={() => markAsRead(n.id)}
              >
                <div className="text-sm">{n.title}</div>
                <div className="text-xs text-gray-500">{n.body}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(n.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
          <button
            className="w-full mt-2 py-2 text-blue-600 hover:text-blue-800 font-semibold border-t border-gray-200 bg-white hover:bg-gray-50 transition rounded-b-lg"
            onClick={() => { setShowAllModal(true); setDropdownOpen(false); }}
          >
            Display all notifications
          </button>
        </div>
      )}
      {showAllModal && loggedInUser?.id && (
        <AllNotificationsModal
          isOpen={showAllModal}
          onClose={() => setShowAllModal(false)}
          userId={loggedInUser.id}
        />
      )}
    </div>
  );
};

export default NotificationBell; 