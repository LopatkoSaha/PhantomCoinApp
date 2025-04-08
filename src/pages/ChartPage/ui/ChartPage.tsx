import { useParams } from "react-router-dom";
import { useState } from "react";

import style from "./ChartPage.module.scss";
import { ChartDynamic } from "shared/components/Charts/ChartDynamic";
import { ChartHistory } from "shared/components/Charts/ChartHistory";



export const ChartPage = () => {
  const {currency} = useParams();
  const [chartType, setChartType] = useState<"dynamic" | "history">("dynamic");

  const chartToggle = () => {
    setChartType((prev) => {
      if (prev === "dynamic") { 
        return "history";
      } else {
        return "dynamic";
      }

    })
  }

  return (
    <div className={style.wrapper}>
      <div className={style.btnToggle}>
        <button onClick={chartToggle}>{chartType === "dynamic" ? "12 мес" : "1 день"}</button>
      </div>
      <div className={style.chartContainer}>
        {chartType === "dynamic" && <ChartDynamic currency={currency ?? ""} />}
        {chartType === "history" && <ChartHistory currency={currency ?? ""} />}
      </div>
    </div>
  );
};

