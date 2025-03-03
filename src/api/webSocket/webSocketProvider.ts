import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setCurrencyCourses } from "app/store/slices/coursesSlice";
import { AppDispatch } from "app/store/store";
import { WS_URL } from "shared/config/config";


export default function WebSocketProvider() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      console.log("✅ WebSocket соединение установлено");
    };

    socket.onmessage = (event) => {
      try {
        const updatedCourses = JSON.parse(event.data);
        dispatch(setCurrencyCourses(updatedCourses));
      } catch (error) {
        console.error("❌ Ошибка парсинга курсов:", error);
      }
    };

    socket.onclose = () => {
      console.log("❌ Соединение закрыто");
    };

    socket.onerror = (error) => {
      console.error("❗ Ошибка WebSocket:", error);
    };

    return () => {
      socket.close();
    };
  }, []);

  return null;
}
