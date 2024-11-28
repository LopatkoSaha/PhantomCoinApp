import { useState, useEffect, useRef } from "react";

import style from "./CheckIQ.module.scss";
import { useTimer } from "shared/hooks/useTimer";
import { useLocalStorage } from "shared/hooks/useLocalStorage";

interface Data {
  id: number;
  name: string;
  src: string;
}

interface GameConfig {
  step: number;
  gameTime: number;
  showAllCardTime: number;
  complexityIndex: Record<string, number>;
}

const data: Data[] = [
  {
    id: 1,
    name: "circule",
    src: "https://cdn-icons-png.flaticon.com/128/9432/9432228.png",
  },
  {
    id: 2,
    name: "square",
    src: "https://cdn-icons-png.flaticon.com/128/10765/10765972.png",
  },
  {
    id: 3,
    name: "cube",
    src: "https://cdn-icons-png.flaticon.com/128/136/136784.png",
  },
  {
    id: 4,
    name: "cone",
    src: "https://cdn-icons-png.flaticon.com/128/9656/9656529.png",
  },
  {
    id: 5,
    name: "pentagon",
    src: "https://cdn-icons-png.flaticon.com/128/33/33807.png",
  },
  {
    id: 6,
    name: "middletor",
    src: "https://cdn-icons-png.flaticon.com/128/6511/6511166.png",
  },
  {
    id: 7,
    name: "renault",
    src: "https://cdn-icons-png.flaticon.com/128/6511/6511383.png",
  },
  {
    id: 8,
    name: "pyramid",
    src: "https://cdn-icons-png.flaticon.com/128/7800/7800012.png",
  },
  {
    id: 9,
    name: "ball",
    src: "https://cdn-icons-png.flaticon.com/128/16397/16397089.png",
  },
  {
    id: 10,
    name: "sixgon",
    src: "https://cdn-icons-png.flaticon.com/128/32/32425.png",
  },
  {
    id: 11,
    name: "rubic",
    src: "https://cdn-icons-png.flaticon.com/128/16397/16397063.png",
  },
  {
    id: 12,
    name: "diamond",
    src: "https://cdn-icons-png.flaticon.com/128/6081/6081578.png",
  },
  {
    id: 13,
    name: "health",
    src: "https://cdn-icons-png.flaticon.com/128/11407/11407586.png",
  },
  {
    id: 14,
    name: "snow",
    src: "https://cdn-icons-png.flaticon.com/128/14439/14439557.png",
  },
  {
    id: 15,
    name: "plus",
    src: "https://cdn-icons-png.flaticon.com/128/12029/12029786.png",
  },
  {
    id: 16,
    name: "moon",
    src: "https://cdn-icons-png.flaticon.com/128/12029/12029780.png",
  },
  {
    id: 17,
    name: "left",
    src: "https://cdn-icons-png.flaticon.com/128/12029/12029768.png",
  },
  {
    id: 18,
    name: "triangle",
    src: "https://cdn-icons-png.flaticon.com/128/12029/12029810.png",
  },
  {
    id: 19,
    name: "cylinder",
    src: "https://cdn-icons-png.flaticon.com/128/12029/12029795.png",
  },
  {
    id: 20,
    name: "coco",
    src: "https://cdn-icons-png.flaticon.com/128/12029/12029804.png",
  },
  {
    id: 21,
    name: "right",
    src: "https://cdn-icons-png.flaticon.com/128/12029/12029813.png",
  },
  {
    id: 22,
    name: "star",
    src: "https://cdn-icons-png.flaticon.com/128/12029/12029924.png",
  },
  {
    id: 23,
    name: "quatrefoil",
    src: "https://cdn-icons-png.flaticon.com/128/12029/12029879.png",
  },
  {
    id: 24,
    name: "boom",
    src: "https://cdn-icons-png.flaticon.com/128/12029/12029920.png",
  },
  {
    id: 25,
    name: "middlecircule",
    src: "https://cdn-icons-png.flaticon.com/128/12029/12029820.png",
  },
];

const gameConfig: GameConfig = {
  step: 5,
  gameTime: 60,
  showAllCardTime: 1000 * 10,
  complexityIndex: {
    easy: 9,
    medium: 16,
    hard: 25,
  },
};

function shuffleData(array: Data[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function randomImg(data: Data[]) {
  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex].src;
}

export const CheckIQ: React.FC = () => {
  const { startTimer, stopTimer, timeLeft } = useTimer(gameConfig.gameTime);
  const { stor, getLocalStorage, setLocalStorage } = useLocalStorage();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedAll, setSelectedAll] = useState(false);
  const [exempleCard, setExempleCard] = useState("");
  const [counterStep, setCounterStep] = useState(gameConfig.step);
  const [statusGame, setStatusGame] = useState<
    "win" | "loss" | "prepar" | "playing" | "draw"
  >("prepar");
  const [complexity, setComplexity] = useState<"easy" | "medium" | "hard">(
    "easy"
  );

  useEffect(() => {
    const updatedData = shuffleData(
      data.slice(0, gameConfig.complexityIndex[complexity])
    );
    setAllCards(updatedData);
  }, [complexity]);

  const [allCards, setAllCards] = useState<Data[]>([]);

  const resetGame = () => {
    stopTimer();
    setSelectedIndex(null);
    setSelectedAll(false);
    setExempleCard("");
    setCounterStep(gameConfig.step);
    setStatusGame("prepar");
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    const card = target.closest(`.${style.card}`);

    if (card && !card?.classList.value.includes("selected")) {
      const index = Number(card.getAttribute("data-index"));
      const src = card.getAttribute("data-src");
      setSelectedIndex((prevIndex) => (prevIndex === index ? null : index));
      setCounterStep((prev) => (prev > 0 ? prev - 1 : prev));
      if (src === exempleCard) {
        setStatusGame("win");
        setCounterStep(0);
        stopTimer();
        setLocalStorage({
          name: "progress",
          value: { win: stor.win + 1, loss: stor.loss },
        });
      }
    }
  };

  function startHandler() {
    resetGame();
    setStatusGame("draw");
    setSelectedAll(true);
    setTimeout(() => {
      setStatusGame("playing");
      setSelectedAll(false);
      setExempleCard(randomImg(allCards));
      startTimer(() => {
        setStatusGame("loss");
      });
    }, gameConfig.showAllCardTime);
  }

  useEffect(() => {
    if (counterStep === 0 || timeLeft === "-") {
      if (statusGame === "playing") {
        setStatusGame("loss");
        stopTimer();
        setSelectedAll(true);
        setLocalStorage({
          name: "statistic",
          value: { win: stor.win, loss: stor.loss + 1 },
        });
      }
    }
  }, [counterStep, timeLeft]);

  useEffect(() => {
    getLocalStorage({ name: "statistic", value: { win: 0, loss: 0 } });
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setComplexity(event.target.value as "easy" | "medium" | "hard");
  };

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div
          className={`${style.cardContainer} ${style[complexity]}`}
          onClick={handleCardClick}
        >
          {allCards.map((item, index) => (
            <div
              className={`${style.card} ${
                selectedIndex === index || selectedAll ? style.selected : ""
              }`}
              key={index}
              data-src={item.src}
              data-index={index}
            >
              <div className={`${style.cardSide} ${style.front}`}>
                <img src={item.src} alt={`icon ${index + 1}`} />
              </div>
              <div className={`${style.cardSide} ${style.back}`}>
                <img
                  src="https://images.prom.ua/3637899062_fon-dlya-predmetnoyi.jpg"
                  alt="back"
                />
              </div>
            </div>
          ))}
        </div>
        <div className={style.nav}>
          <div className={style.complexity}>
            <label htmlFor="dropdown">Выберите сложность:</label>
            <select
              id="dropdown"
              value={complexity}
              onChange={handleSelectChange}
              disabled={statusGame !== "prepar"}
            >
              <option value="easy">Легко</option>
              <option value="medium">Средне</option>
              <option value="hard">Сложно</option>
            </select>
          </div>
          <div className={style.statistic}>
            <div className={style.title}>Достижения</div>
            <div className={style.winCount}>Победы: {stor.win}</div>
            <div className={style.lossCount}>Поражения: {stor.loss}</div>
            <button
              className={style.resetStatisticBtn}
              onClick={() =>
                setLocalStorage({
                  name: "statistic",
                  value: { win: 0, loss: 0 },
                })
              }
            >
              Сбросить достижения
            </button>
          </div>
          <div className={style.gameTimer}>Время: {timeLeft} сек</div>
          <div className={style.step}>Шаги: {counterStep}</div>
          <div className={style.info}>
            {statusGame === "prepar" && "Нажмите СТАРТ"}
            {statusGame === "draw" && "Запомните расположение карточек"}
            {statusGame === "playing" && "Найдите карточку"}
            {statusGame === "win" && "Вы молодец, правитьно"}
            {statusGame === "loss" && "Вы проиграли, попробуйте еще"}
          </div>
          <div className={style.exempleImg}>
            {statusGame === "playing" && exempleCard && (
              <img src={exempleCard} alt="Exemple" />
            )}
            {statusGame === "win" && (
              <div className={style.winPict}>
                <img
                  src="https://otkritkis.com/wp-content/uploads/2022/07/huc6n.gif"
                  alt="Win"
                />
              </div>
            )}
            {statusGame === "loss" && (
              <div className={style.lossPict}>
                <img
                  src="https://otkritkis.com/wp-content/uploads/2022/07/huc6r.gif"
                  alt="Loss"
                />
              </div>
            )}
          </div>
          <button
            className={style.startBtn}
            onClick={startHandler}
            disabled={!(statusGame === "prepar")}
          >
            Старт
          </button>
          <button
            className={style.resetBtn}
            onClick={resetGame}
            disabled={statusGame === "draw"}
          >
            Начать заново
          </button>
        </div>
      </div>
    </div>
  );
};
