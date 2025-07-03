import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

interface Notification {
  id: string;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string;
}

interface AllNotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

const AllNotificationsModal: React.FC<AllNotificationsModalProps> = ({ isOpen, onClose, userId }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || !userId) return;
    setLoading(true);
    setError(null);
    axiosInstance
      .get(`/Notification/getAllNotificationsByUserId/${userId}`)
      .then((res) => setNotifications(res.data || []))
      .catch((err) => setError("Failed to fetch notifications."))
      .finally(() => setLoading(false));
  }, [isOpen, userId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">All Notifications</h2>
        <div className="overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No notifications found.</div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3 border-b last:border-b-0 ${n.isRead ? "text-gray-400" : "text-gray-900 font-semibold"}`}
              >
                <div className="flex justify-between items-center">
                  <div className="text-sm">{n.title}</div>
                  <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${n.isRead ? "bg-gray-200 text-gray-500" : "bg-blue-100 text-blue-700"}`}>
                    {n.isRead ? "Read" : "Unread"}
                  </span>
                </div>
                <div className="text-xs text-gray-500">{n.body}</div>
                <div className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleString()}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllNotificationsModal; 