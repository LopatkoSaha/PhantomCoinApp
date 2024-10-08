import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { intervalChenged } from "shared/config/config";
import { cousesChanger } from "shared/hendlers/coursesChanger";
import { AppDispatch } from "app/store/store";
import { currencyList } from "shared/config/config";

export const ChargeOfCourse = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    cousesChanger(intervalChenged, dispatch, currencyList);
  }, []);

  return <></>;
};
