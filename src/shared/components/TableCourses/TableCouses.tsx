import { useState } from "react";

import style from "./TableCourses.module.scss";
import { useAppSelector } from "app/store/useAppSelector";
import { currencyList } from "../../config/config";

export const TableCourses = () => {
  const [showAllCourses, setShowAllCourses] = useState(false);
  const list: Record<string, string> = currencyList;
  type CoursesState = Record<string, number>;
  const currentCourses = useAppSelector(
    (state: { courses: CoursesState }) => state.courses
  );

  if (Object.entries(currentCourses).length > 0) {
    const sortedCurrentCourses = Object.entries(currentCourses).sort(
      (a, b) => b[1] - a[1]
    );

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
              {!showAllCourses ? "Show all" : "Hide others"}
            </button>
            {currencys.map(([name, value]) => {
              return (
                <div className={style.card} id={name}>
                  <div className={style.img}>
                    <img src={list[name]} alt={name} />
                  </div>
                  <div className={style.name}>{name}</div>
                  <div className={style.course}>{`${value.toFixed(
                    3
                  )} chtl`}</div>
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
