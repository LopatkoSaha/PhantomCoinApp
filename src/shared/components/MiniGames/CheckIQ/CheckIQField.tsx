import { useState, useEffect } from "react";

import style from "./CheckIQ.module.scss";
import type { TGameData } from "./CheckIQ";
import { GameField } from "./GameField";
import { GameTimer } from "./GameTimer";
import { GameResult } from "./GameResult";



type TProps = {
    gameData: TGameData,
    initHandler: () => void;
    moveHandler: (moveData: number) => void;
    finishGameHandler: () => void;
    fetchSession: () => void;
};

export const CheckIQField = (props: TProps) => {
    const {gameData, initHandler, moveHandler, finishGameHandler, fetchSession} = props;
    const {
        status,
        x,
        y,
        turns,
        field,
        moves,
        endOfGame,
        exercise,
        timeShowField,
    } = gameData;


    useEffect(() => {
        if(timeShowField){
            setTimeout(()=>{
                initHandler();
            },timeShowField * 1000);
        }
    },[])

    const handleClickCell = (e: React.MouseEvent<HTMLElement>) => {
        if (status === "win" || status === "loss") return;
        const clickIdx = (e.target as HTMLDivElement).dataset.idx;
        if (field[+clickIdx!]?.isOpen) return;
            moveHandler(+clickIdx!);
      };

    const stopTimer = status === "active" ? false : true;

    return (
        <>
            <div className={style.header}>Check IQ</div>
                <div className={style.content}>
                    {status === "active" && <GameField x={x} y={y} fieldData={field} handleClick={handleClickCell}/>}
                    {status !== "active" && <GameResult x={x} y={y} fieldData={field} exercise={exercise!} />}
                    <div className={style.nav}>
                        {status === "active" && <div className={style.info}>Игра продлжается</div>}
                        {status === "win" && <div className={style.info}>Победа</div>}
                        {status === "loss" && <div className={style.info}>Проигрыш</div>}
                        <div className={style.turns}>Осталось ходов: {turns}</div>
                        <GameTimer endOfGame={endOfGame} stopInterval={stopTimer} handleFinish={fetchSession}/>
                        <div className={style.exercise}>{exercise}</div>
                        <div className={style.btnContainer}>
                            <button className={style.btnStop} onClick={finishGameHandler}>Рестарт</button>
                        </div>
                    </div>
                </div>
        </>
    )
}