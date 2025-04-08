import { useState, useEffect } from "react";


//@ts-ignore
import CanvasJSReact from "@canvasjs/react-charts";
import { allCoursesPost } from "api/axios/allCoursePost";


type TChartData = { 
  date: Date,
  open_course: string,
  min_course: string,
  max_course: string,
  close_course: string,
}


function generateOptions(data: Record<string, any>[], currency: string) {

  const options = {
    animationEnabled: true,
    theme: "dark1", // "light1", "light2", "dark1", "dark2"
    zoomEnabled: true,
    exportEnabled: false,
    title: {
      text: `History course of ${currency}`,
    },
    // subtitles: [{
    //   text: "Weekly Averages"
    // }],
    axisX: {
      interval: 1,
      valueFormatString: "MMM DD"
    },
    axisY: {
      prefix: "$",
      title: "Price"
    },
    toolTip: { content: "Date: {x}<br /><strong>Price:</strong><br />Open: {y[0]}, Close: {y[3]}<br />High: {y[1]}, Low: {y[2]}"},
    data: [{
        type: "candlestick",
        fallingColor: "#F79B8E",
        risingColor: "yellow",
        // color: "yellow",
        // fillOpacity: .3,
        yValueFormatString: "$##0.00",
        dataPoints: data, //prepareCandlesData(data),
    }],
  };

  return options;
}


export const ChartHistory = (props: {currency: string}) => {
  const [chartData, setChartData] = useState<Record<string, any>[]>([]);
  
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const historyData: TChartData[] = await allCoursesPost(props.currency);
        const data = historyData.map((item) => (
          {
            x: new Date(item.date),
            y: [+item.open_course, +item.min_course, +item.max_course, +item.close_course],
          }
        ))
        setChartData(data);
      } catch (error) {
        console.error("Ошибка при загрузке истории:", error);
      }
    };
    fetchHistory();
  }, [props.currency]);
  
  return (
    <div>
      <CanvasJSReact.CanvasJSChart  options ={generateOptions(chartData, props.currency)} />
    </div>
  );
};
