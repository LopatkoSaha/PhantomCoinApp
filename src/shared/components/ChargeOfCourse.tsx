import { useEffect } from "react";
import { useDispatch } from "react-redux";


import { AppDispatch } from "app/store/store";
import { coinIconsGet } from "api/axios/coinIconsGet";
import WebSocketProvider from "api/webSocket/webSocketProvider";
import useWebSocket from "shared/hooks/useWebSocket";
import { WS_URL } from "shared/config/config";
import { setCurrencyCourses } from "app/store/slices/coursesSlice";

export const ChargeOfCourse = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    coinIconsGet(dispatch);
  }, []);

  const [isConnect] = useWebSocket(WS_URL, (data) => dispatch(setCurrencyCourses(data)));

  return (
    <div>{isConnect ? "Connect" : "No connect"}</div>
  )
};
