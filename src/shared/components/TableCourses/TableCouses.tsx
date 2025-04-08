import { useState } from "react";
import { Link } from "react-router-dom";

import style from "./TableCourses.module.scss";
import { useAppSelector } from "app/store/useAppSelector";

interface CoinIconsState {
  [key: string]: string;
}

type TCoursesState = {
    startCourses: Record<string, number>,
    currentCourses: Record<string, number>,
}

export const TableCourses = () => {
  const [showAllCourses, setShowAllCourses] = useState(false);
  const {currentCourses, startCourses} = useAppSelector(
    (state: { courses: TCoursesState }) => state.courses
  );
  const coinIcons = useAppSelector((state: { coinIcons: CoinIconsState }) => state.coinIcons);

  if (Object.entries(currentCourses).length > 0) {
    const sortedCurrentCourses = Object.entries(currentCourses)
    .sort(
      (a, b) => b[1] - a[1]
    ).map(([name, value]) => {
      const numericValue = Number(value).toFixed(2);
      return {
        name, 
        value: numericValue, 
        diff: 100*(+numericValue - startCourses[name])/startCourses[name]
      };
    });

    const currencys = showAllCourses
      ? sortedCurrentCourses
      : sortedCurrentCourses.slice(0, 3);

    const hendlshowCourses = () => {
      setShowAllCourses((prev) => !prev);
    };

    return (
        <div className={style.wrapper}>
          <div className={style.container}>
            <button className={style.btn} onClick={hendlshowCourses}>
              {!showAllCourses ? "Show all" : "Show top"}
            </button>
            {currencys.map(({name, value, diff}) => {
              return (
                <div className={style.card} id={name} key={name + 1}>
                  <div className={style.img}>
                    <img src={coinIcons[name as string]} alt={name as string} />
                  </div>
                  <Link to={`/chart/${name}`}>
                    <a className={style.name}>{name}</a>
                  </Link>
                  <div className={style.course}>{`${value} usd`}</div>
                  <div className={style.diff}>{`${diff.toFixed(2)} %`}</div>
                </div>
              );
            })}
          </div>
        </div>
    );
  } else {
    return <div className={style.wrapper}>No courses</div>;
  }
};
