import { FC } from "react";

import style from "./GamePage.module.scss";
import { ColorSwap } from "shared/components/MiniGames/ColorSwap/ColorSwap";
import { CheckIQ } from "shared/components/MiniGames/GuessNumber/CheckIQ";
import { FindCircule } from "shared/components/MiniGames/FindCircule/FindCircule";
import { useAppSelector } from "app/store/useAppSelector";

export const nameGames: Record<string, FC> = {
  ColorSwap: ColorSwap,
  CheckIQ: CheckIQ,
  FindCircule: FindCircule,
};

const GamePage = () => {
  const currentGame = useAppSelector((state) => state.toggleGames);

  const SelectedGame = nameGames[currentGame as keyof typeof nameGames];

  return (
    <div className={style.wrapperGamePage}>
      <SelectedGame />
    </div>
  );
};

export default GamePage;
