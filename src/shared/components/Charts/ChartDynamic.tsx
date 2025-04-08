import { useState } from "react";

import useWebSocket from "shared/hooks/useWebSocket";
import {  WS_ONE_URL } from "shared/config/config";
//@ts-ignore
import CanvasJSReact from "@canvasjs/react-charts";


type TChartData = { 
  course: string,
  created_at: string,
}

function generateOptions(data: TChartData[], currency: string) {
  const options = {
    animationEnabled: true,
    theme: "dark1", // "light1", "light2", "dark1", "dark2"
    zoomEnabled: true,
    exportEnabled: false,
    title: {
      text: `Dynamic course of ${currency}`,
    },
    // subtitles: [{
    //   text: "Weekly Averages"
    // }],
    axisX: {
      interval: 1,
      valueFormatString: "HH:mm"
    },
    axisY: {
      prefix: "$",
      title: "Price"
    },
    toolTip: { content: "Date: {x}<br /><strong>Price:</strong> {y}"},
    data: [{
      type: "line",
      color: "red",
      // type: "spline",
      // markerSize: 0,
      dataPoints: data.map((item) => ({
        x: new Date(item.created_at),
        y: +item.course,
      }))
    }],
  };

  return options;
}


export const ChartDynamic = (props: {currency: string}) => {
  const [chartData, setChartData] = useState<TChartData[]>([]);

  const [isConnect] = useWebSocket(`${WS_ONE_URL}?curr=${props.currency}`, (data: TChartData[]) => {
      if(Array.isArray(data)) {
        setChartData(data);
      }else{
        setChartData((prev) => [...prev, data]);
      }
    });

  return (
    <div>
      <CanvasJSReact.CanvasJSChart  options ={generateOptions(chartData, props.currency)} />
    </div>
  );
};

