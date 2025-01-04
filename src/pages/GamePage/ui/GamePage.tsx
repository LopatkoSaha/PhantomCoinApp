import { FC } from "react";

import style from "./GamePage.module.scss";
import { useAppSelector } from "app/store/useAppSelector";
import { ColorSwap } from "shared/components/MiniGames/ColorSwap/ColorSwap";
import { CheckIQ } from "shared/components/MiniGames/CheckIQ/CheckIQ";
import { FindCircule } from "shared/components/MiniGames/FindCircule/FindCircule";
import { BullsAndCows } from "shared/components/MiniGames/BullsAndCows/BullsAndCows";
import { Sapper } from "shared/components/MiniGames/Sapper/Sapper";

export const nameGames: Record<string, FC> = {
  ColorSwap: ColorSwap,
  CheckIQ: CheckIQ,
  FindCircule: FindCircule,
  BullsAndCows: BullsAndCows,
  Sapper: Sapper,
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
