import { useState } from "react";

import style from "./MarketPage.module.scss";
import { TableCourses } from "shared/components/TableCourses/TableCouses";
import { ChartCurrCourses } from "shared/components/ChartCurrCourses";
import { useAppSelector } from "app/store/useAppSelector";

const MarketPage = () => {
  const currentCourses = useAppSelector((state) => state.courses);
  const nameCuts: Record<string, string> = useAppSelector(
    (state) => state.lexiconCuts
  );

  const data = Object.entries(currentCourses).reduce(
    (acc: { name: string; value: number }[], [name, value]) => {
      acc.push({ name: nameCuts[name], value: value as number });
      return acc;
    },
    []
  );

  const [toggleShowing, setToggleShowing] = useState(true);
  const hendlToggleShowing = () => setToggleShowing((pre) => !pre);

  return (
    <div className={style.wrapperMarket}>
      <button className={style.btnToggle} onClick={hendlToggleShowing}>
        {toggleShowing ? "Show charge" : "Show table"}
      </button>
      {toggleShowing ? <TableCourses /> : <ChartCurrCourses data={data} />}
    </div>
  );
};

export default MarketPage;
