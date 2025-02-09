import { useState } from "react";

import style from "./MarketPage.module.scss";
import { TableCourses } from "shared/components/TableCourses/TableCouses";
import { ChartCurrCourses } from "shared/components/ChartCurrCourses";
import { useAppSelector } from "app/store/useAppSelector";

const MarketPage = () => {
  const currentCourses = useAppSelector((state) => state.courses);

  const data = Object.entries(currentCourses)
  .filter(([key]) => key !== "id" && key !== "created_at")
  .map(([key, value]) => {
    return {
      name: key,
      value: Number(value)
    }
  })

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
