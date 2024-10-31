import { useState, useEffect } from "react";

import style from "./FindCircule.module.scss";

export const FindCircule = () => {
  const initSqireLine = ["1", "2", "3"];
  const randomNumber = Math.floor(Math.random() * 3) + 1;
  const [choisedNum, setChoisedNum] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  let res = choisedNum;

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.header}>Найди шарик</div>
        <div className={style.info}>
          {!res
            ? "Ввберите одну из фигур"
            : res === randomNumber
            ? "Угадал"
            : "Не угадал"}
        </div>
        <div className={style.containerSquare}>
          {initSqireLine.map((item, ind) => {
            return (
              <div
                className={`${style.square} ${
                  selectedId === ind && res === randomNumber
                    ? style.circule
                    : ""
                }`}
                key={ind}
                id={ind.toString()}
                onClick={() => {
                  setChoisedNum(ind + 1);
                  setSelectedId(ind);
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
