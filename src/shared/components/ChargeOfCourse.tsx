import { useEffect } from "react";
import { useDispatch } from "react-redux";


import { AppDispatch } from "app/store/store";
import { coinIconsGet } from "api/axios/coinIconsGet";
import useWebSocket from "shared/hooks/useWebSocket";
import { WS_ALL_URL } from "shared/config/config";
import { setStartCourses, setCurrentCourses } from "app/store/slices/coursesSlice";

export const ChargeOfCourse = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    coinIconsGet(dispatch);
  }, []);

  const [isConnect] = useWebSocket(WS_ALL_URL, (data) => {
    if(data.isFirst) {
      dispatch(setStartCourses(data))
    }else{
      dispatch(setCurrentCourses(data))
    }
  });

  return (
    <div>{isConnect ? "Connect" : "No connect"}</div>
  )
};
