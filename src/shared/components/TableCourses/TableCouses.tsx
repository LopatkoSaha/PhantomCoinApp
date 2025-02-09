import { useState } from "react";

import style from "./TableCourses.module.scss";
import { useAppSelector } from "app/store/useAppSelector";

interface CoinIconsState {
  [key: string]: string;
}

export const TableCourses = () => {
  const [showAllCourses, setShowAllCourses] = useState(false);
  type CoursesState = Record<string, number>;
  const currentCourses = useAppSelector(
    (state: { courses: CoursesState }) => state.courses
  );
  const coinIcons = useAppSelector((state: { coinIcons: CoinIconsState }) => state.coinIcons);

  if (Object.entries(currentCourses).length > 0) {
    const sortedCurrentCourses = Object.entries(currentCourses)
    .filter(([key]) => key !== "id" && key !== "created_at")
    .sort(
      (a, b) => b[1] - a[1]
    ).map(([key, value]) => {
      const numericValue = Number(value).toFixed(2);
      return [key, numericValue];
    });

    const currencys = showAllCourses
      ? sortedCurrentCourses
      : sortedCurrentCourses.slice(0, 3);

    const hendlshowCourses = () => {
      setShowAllCourses((prev) => !prev);
    };

    return (
      <>
        <div className={style.wrapper}>
          <div className={style.container}>
            <button className={style.btn} onClick={hendlshowCourses}>
              {!showAllCourses ? "Show all" : "Show top"}
            </button>
            {currencys.map(([name, value]) => {
              return (
                <div className={style.card} id={name} key={name + 1}>
                  <div className={style.img}>
                    <img src={coinIcons[name as string]} alt={name as string} />
                  </div>
                  <div className={style.name}>{name}</div>
                  <div className={style.course}>{`${value} chtl`}</div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  } else {
    return <div className={style.wrapper}>No courses</div>;
  }
};
