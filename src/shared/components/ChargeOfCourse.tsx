import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { intervalChenged } from "shared/config/config";
import { cousesChanger } from "shared/hendlers/coursesChanger";
import { AppDispatch } from "app/store/store";
import { currencyList, lexiconCuts } from "shared/config/config";
import { useAppSelector } from "app/store/useAppSelector";
import { setLexiconCuts } from "app/store/slices/lexiconSlice";

export const ChargeOfCourse = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentCourses = useAppSelector((state) => state.courses);
  useEffect(() => {
    cousesChanger(intervalChenged, dispatch, currencyList, currentCourses);
    dispatch(setLexiconCuts(lexiconCuts));
  }, []);

  return <></>;
};
