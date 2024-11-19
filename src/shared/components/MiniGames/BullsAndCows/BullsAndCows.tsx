import { useState, useEffect } from "react";

import style from "./BullsAndCows.module.scss";
import { Checked } from "shared/components/MiniGames/BullsAndCows/Checked";

const colorList: Record<string, string> = {
  0: "noColor",
  1: "red",
  2: "orange",
  3: "yellow",
  4: "green",
  5: "blue",
  6: "violet",
  7: "aqua",
  8: "grey",
};

const configGame = {
  quantityColors: 3,
  quantitySteps: 4,
};

function shuffleData(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const BullsAndCows = () => {
  const [randomColorList, setRandomColorList] = useState(
    new Array(configGame.quantityColors).fill(1)
  );
  const [statusSteps, setStatusSteps] = useState<(string | null)[]>(
    new Array(configGame.quantitySteps).fill(null)
  );

  const [statusGame, setStatusGame] = useState<"win" | "loss" | "playing">(
    "playing"
  );
  const [isActiveField, setIsActiveField] = useState(0);

  useEffect(() => {
    statusSteps.forEach((item) => {
      if (item === null) return;
      const winControl =
        JSON.parse(item).bulls === configGame.quantityColors &&
        JSON.parse(item).crows === configGame.quantityColors;
      if (winControl) {
        setStatusGame("win");
        setIsActiveField(configGame.quantitySteps + 1);
      }
      if (isActiveField === configGame.quantitySteps && !winControl)
        setStatusGame("loss");
    });
  }, [statusSteps]);

  useEffect(() => {
    const updatedData = shuffleData(Object.keys(colorList).slice(1));
    setRandomColorList(updatedData.slice(0, configGame.quantityColors));
    setStatusGame("playing");
  }, []);

  // const hendleRestart = () => {
  //   setStatusGame("playing");
  //   setIsActiveField(0);
  //   const updatedData = shuffleData(Object.keys(colorList).slice(1));
  //   setRandomColorList(updatedData.slice(0, configGame.quantityColors));
  //   setStatusSteps(new Array(configGame.quantitySteps).fill(null));
  // };

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.contentNavZone}>
          <div className={style.rules}>Rules</div>
          <div className={style.complexity}>Complexity</div>
          <div className={style.time}>Time</div>
          {/* <button className={style.restartBtn} onClick={hendleRestart}> */}
          {/* Restart
          </button> */}
        </div>
        <div className={style.contentPlayZone}>
          <div className={style.title}>
            {statusGame === "playing" && "Угадай последовательность цветов"}
            {statusGame === "win" && "Молодец, ты угадал"}
            {statusGame === "loss" && "Не угадал, попробуй еще"}
          </div>
          <div className={style.containerColors}>
            {randomColorList &&
              randomColorList.map((item, ind) => {
                return (
                  <div
                    className={`${style.card} ${style[colorList[item]]}`}
                    key={ind}
                  >
                    {colorList[item]}
                  </div>
                );
              })}
          </div>
          <div className={style.containerChecked}>
            {statusSteps.map((item, ind) => {
              return (
                <Checked
                  key={ind}
                  colorsList={colorList}
                  quantityColors={configGame.quantityColors}
                  exercise={randomColorList.map((item) => +item)}
                  setStatusSteps={setStatusSteps}
                  isActiveField={isActiveField}
                  setIsActiveField={setIsActiveField}
                  indGameField={ind}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
