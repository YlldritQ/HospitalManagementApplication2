import React, { useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import { toast } from "react-hot-toast";

interface NotificationProviderProps {
  children: React.ReactNode;
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const connectionRef = useRef<signalR.HubConnection | null>(null);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7149/hubs/notifications")
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connectionRef.current = connection;

    connection.on("ReceiveNotification", (title: string, body: string) => {
      toast(`${title}: ${body}`, {
        position: "top-right",
        duration: 5000,
      });
    });

    connection
      .start()
      .then(() => console.info("✅ SignalR connected"))
      .catch((err) => console.error("❌ SignalR error:", err));

    return () => {
      connection.off("ReceiveNotification");
      connection.stop();
    };
  }, []);

  return <>{children}</>;
};

export default NotificationProvider;
