import { useEffect } from "react";
import { useDispatch } from "react-redux";


import { AppDispatch } from "app/store/store";
import { currentCoursesGet } from "api/axios/currentCoursesGet";
import { coinIconsGet } from "api/axios/coinIconsGet";

export const ChargeOfCourse = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    currentCoursesGet(dispatch);
    coinIconsGet(dispatch);
  }, []);

  return <></>;
};
