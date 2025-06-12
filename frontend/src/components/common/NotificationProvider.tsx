import { useEffect, useState } from "react";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import { toast } from "react-hot-toast";

const NotificationProvider = () => {
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://localhost:5000/notificationhub") // update URL if needed
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("✅ SignalR connected");
          connection.on("ReceiveNotification", (message: string) => {
            toast.success(message); // 🔔 Show toast
          });
        })
        .catch((err) => console.error("❌ SignalR connection error:", err));
    }
  }, [connection]);

  return null; // no visible UI, only handles background logic
};

export default NotificationProvider;
