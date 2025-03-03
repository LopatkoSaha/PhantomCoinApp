import { useEffect, useState } from "react";

export default function useWebSocket(wsUrl: string, messageCb: (data: any) => any) {

  const [isConnect, setIsConnect] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
        setIsConnect(true);
      console.log("✅ WebSocket соединение установлено");
    };

    socket.onmessage = (event) => {
      try {
        const updatedCourses = JSON.parse(event.data);
        messageCb(updatedCourses);
      } catch (error) {
        console.error("❌ Ошибка парсинга данных:", error);
      }
    };

    socket.onclose = () => {
        setIsConnect(false);
      console.log("❌ Соединение закрыто");
    };

    socket.onerror = (error) => {
      console.error("❗ Ошибка WebSocket:", error);
    };

    return () => {
      socket.close();
    };
  }, []);

  return [isConnect];
}
