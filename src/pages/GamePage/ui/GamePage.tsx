import { FC, useState } from "react";

import style from "./GamePage.module.scss";
import { ColorSwap } from "shared/components/MiniGames/ColorSwap/ColorSwap";
import { CheckIQ } from "shared/components/MiniGames/CheckIQ/CheckIQ";
import { FindCircule } from "shared/components/MiniGames/FindCircule/FindCircule";
import { BullsAndCows } from "shared/components/MiniGames/BullsAndCows/BullsAndCows";
import { Minesweeper } from "shared/components/MiniGames/Minesweeper/Minesweeper";
import { useCheckAuth } from "shared/hooks/useCheckAuth";
import { presentation } from "./presentation";

export const games: Record<string, FC> = {
  Minesweeper: Minesweeper,
  BullsAndCows: BullsAndCows,
  ColorSwap: ColorSwap,
  CheckIQ: CheckIQ,
  FindCircule: FindCircule,
};

export const GamePage = () => {
  useCheckAuth();
  const [gameName, setGameName] = useState(Object.keys(games)[0]);
  const [gamePlay, setGamePlay] = useState(false);

  const handleGameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (gameName !== event.target.value) setGamePlay(false);
    setGameName(event.target.value);
  };

  const handleEnteredGame = () => {
    setGamePlay(true);
  }

  const handlExit = () => {
    setGamePlay(false);
  }

  const SelectedGame = games[gameName as keyof typeof games];

  return (
    <div className={style.wrapperGamePage}>
      {!gamePlay && 
      <div className={style.containerOptions}>
        <div className={style.header}>Mini Game</div>
        <div className={style.presentation}>
          {presentation}
        </div>
        <div className={style.buyContent}>
          <label htmlFor="buyDropdown">Выберите игру: </label>
          <select id="buyDropdown" value={gameName} onChange={handleGameChange}>
              {Object.keys(games).map((name) => (
                  <option key={name} value={name}>
                      {name}
                  </option>
              ))}
          </select>
        </div>
        <button className={style.btnPlay} onClick={handleEnteredGame}> Играть </button>
      </div>
      }
      {gamePlay &&
        <>
          <button onClick={handlExit}> Назад </button>
          <SelectedGame />
        </>
      }
    </div>
  );
};

