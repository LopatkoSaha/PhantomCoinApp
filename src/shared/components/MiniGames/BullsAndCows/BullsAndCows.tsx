import { useState, useEffect } from "react";

import style from "./BullsAndCows.module.scss";
import { Checked } from "shared/components/MiniGames/BullsAndCows/Checked";
import { discripttionBullsCrows } from "shared/assets/texts/discriptionBullsCrows";

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
  easy: {
    quantityColors: 3,
    quantitySteps: 5,
  },
  medium: {
    quantityColors: 4,
    quantitySteps: 7,
  },
  hard: {
    quantityColors: 5,
    quantitySteps: 10,
  },
};

export type TStatusStep = {
  status: string | null;
  key: number;
};

type TComplexity = {
  quantityColors: number;
  quantitySteps: number;
};

function shuffleData(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const BullsAndCows = () => {
  const [complexity, setComplexity] = useState<"easy" | "medium" | "hard">(
    "easy"
  );

  const [randomColorList, setRandomColorList] = useState(
    new Array(configGame[complexity].quantityColors).fill(1)
  );

  const [statusSteps, setStatusSteps] = useState<TStatusStep[]>(
    new Array(configGame[complexity].quantitySteps).fill({
      status: null,
      key: Date.now(),
    })
  );

  const [statusGame, setStatusGame] = useState<"win" | "loss" | "playing">(
    "playing"
  );
  const [isActiveField, setIsActiveField] = useState(0);

  const [showModal, setShowModal] = useState<"show" | "">("");

  useEffect(() => {
    hendleRestart();
  }, [complexity]);

  useEffect(() => {
    statusSteps.forEach((item) => {
      if (item.status === null) return;
      const winControl =
        JSON.parse(item.status).bulls ===
          configGame[complexity].quantityColors &&
        JSON.parse(item.status).crows === configGame[complexity].quantityColors;
      if (winControl) {
        setStatusGame("win");
        setIsActiveField(configGame[complexity].quantitySteps + 1);
      }
      if (isActiveField === configGame[complexity].quantitySteps && !winControl)
        setStatusGame("loss");
    });
  }, [statusSteps]);

  useEffect(() => {
    const updatedData = shuffleData(Object.keys(colorList).slice(1));
    setRandomColorList(
      updatedData.slice(0, configGame[complexity].quantityColors)
    );
    setStatusGame("playing");
  }, []);

  const hendleRestart = () => {
    setStatusGame("playing");
    setIsActiveField(0);
    const updatedData = shuffleData(Object.keys(colorList).slice(1));
    setRandomColorList(
      updatedData.slice(0, configGame[complexity].quantityColors)
    );
    setStatusSteps(
      new Array(configGame[complexity].quantitySteps).fill({
        status: null,
        key: Date.now(),
      })
    );
  };

  const handleComplexity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setComplexity(event.target.value as "easy" | "medium" | "hard");
  };

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.content}>
          <div className={style.contentNavZone}>
            <button
              className={style.rules}
              onClick={() => setShowModal("show")}
            >
              Правила игры
            </button>
            <div className={style.complexity}>
              <label htmlFor="dropdown">Сложность: </label>
              <select
                id="dropdown"
                value={complexity}
                onChange={handleComplexity}
              >
                <option value="easy">Легко</option>
                <option value="medium">Средне</option>
                <option value="hard">Сложно</option>
              </select>
            </div>
            <button className={style.restartBtn} onClick={hendleRestart}>
              Restart
            </button>
          </div>
          <div className={style.contentPlayZone}>
            <div className={style.title}>
              {statusGame === "playing" &&
                `Угадай последовательность из ${configGame[complexity].quantityColors} цветов за ${configGame[complexity].quantitySteps} попыток`}
              {statusGame === "win" && "Молодец, ты угадал"}
              {statusGame === "loss" && "Не угадал, попробуй еще"}
            </div>
            <div className={style.containerColors}>
              {randomColorList &&
                statusGame !== "playing" &&
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
                    key={item.key + ind}
                    colorsList={colorList}
                    quantityColors={configGame[complexity].quantityColors}
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
      <div className={`${style.wrapperModal} ${style[showModal]}`}>
        <div className={style.contentModal}>
          <div className={style.titleModal}>Быки и коровы</div>
          <div className={style.textModal}>{discripttionBullsCrows}</div>
          <button
            onClick={() => {
              setShowModal("");
            }}
          >
            Ok
          </button>
        </div>
      </div>
    </>
  );
};
