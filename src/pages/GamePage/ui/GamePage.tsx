import { FC } from "react";

import style from "./GamePage.module.scss";
import { useAppSelector } from "app/store/useAppSelector";
import { ColorSwap } from "shared/components/MiniGames/ColorSwap/ColorSwap";
import { CheckIQ } from "shared/components/MiniGames/GuessNumber/CheckIQ";
import { FindCircule } from "shared/components/MiniGames/FindCircule/FindCircule";
import { BullsAndCows } from "shared/components/MiniGames/BullsAndCows/BullsAndCows";

export const nameGames: Record<string, FC> = {
  ColorSwap: ColorSwap,
  CheckIQ: CheckIQ,
  FindCircule: FindCircule,
  BullsAndCows: BullsAndCows,
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
