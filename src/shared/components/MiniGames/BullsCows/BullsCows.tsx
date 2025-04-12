import { useState, useEffect } from "react";

import style from "./BullsCows.module.scss";
import { gameInfoPost } from "api/axios/gamesControllers/gameInfoPost";
import { activeSessionPost } from "api/axios/gamesControllers/activeSessionPost";
import { startGamePost } from "api/axios/gamesControllers/mimesweeper/startGamePost";
import { movePost } from "api/axios/gamesControllers/bulsCows/movePost";
import { finishGamePost } from "api/axios/gamesControllers/mimesweeper/finishGamePost";
import { BullsCowsField } from "./BullsCowsField";
import { GameStartMenu } from "../GameStartMenu/GameStartMenu";

export type TGameData = {
    turns: number;
    moves: Record<string, any>[];
    quest: string[];
    colorsCount: number;
    colors: Record<string, string>;
    status: string;
}

export const BullsCows = () => {
    const [gameInfo, setGameInfo] = useState<Record<string, any> | null>(null);
    const [activeSession, setActiveSession] = useState<TGameData | null>(null);

    const fetchInfo = async () => {
        const info = await gameInfoPost("bullsCows");
        setGameInfo(info);
    };

    const fetchSession = async () => {
        const session = await activeSessionPost("bullsCows");
        setActiveSession(session);
    };

    useEffect(() => {
        fetchInfo();
    },[]);

    useEffect(() => {
        fetchSession();
    }, [gameInfo]);

    const startHandler = async (complexity: string, payoutValue: number, payoutCurrency: string) => {
        const newData = await startGamePost("bullsCows", complexity, payoutValue, payoutCurrency);
        setActiveSession(newData);
    };

    const moveHandler = async (moveData: string[]) => {
        const newData = await movePost(moveData);
        setActiveSession(newData);
    };

    const finishGameHandler = async () => {
        await finishGamePost("bullsCows");
        setActiveSession(null);
    };

    const propsStart = {
        gameData: {
            gameName: gameInfo?.info.name || "Unknown Game",
            gameDiscription: gameInfo?.info.discription || "No description",
            options: gameInfo?.options
            ? gameInfo?.options.map((item: { 
                name_complexity: string; 
                discription_complexity: string; 
                bonus_coefficient: number;
            }) => ({
                  name: item.name_complexity,
                  discription: item.discription_complexity,
                  bonusCoefficient: item.bonus_coefficient,
              }))
            : [],
        },
        startHandler,
    };
    
    const propsField = activeSession
    ? {
        gameData: activeSession,
        moveHandler,
        finishGameHandler,
      }
    : null;

    return (
        <div className={style.wrapper}>
            <div className={style.gameContainer}>
                {!gameInfo && !activeSession ? <div>Loading...</div> : null}
                {activeSession && propsField && <BullsCowsField {...propsField} />}
                {!activeSession && gameInfo && <GameStartMenu {...propsStart} />}
            </div>

        </div>
    )
}