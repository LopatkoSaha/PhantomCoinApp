import { useState, useEffect, useMemo } from "react";

import style from "./BullsCows.module.scss";
import type { TGameData } from "./BullsCows";
import { ColorSelect } from "./ColorSelect";
import { ResultMove } from ".//ResultMove";

type TProps = {
    gameData: TGameData,
    moveHandler: (moveData: string[]) => void;
    finishGameHandler: () => void;
};

export const BullsCowsField = (props: TProps) => {
    const {gameData, moveHandler, finishGameHandler} = props;
    const {status, turns, moves, quest, colorsCount, colors} = gameData;

    const defaultField = Array.from({length: colorsCount}, (_, idx) => "");
    const [field, setField] = useState<string[]>(defaultField);
    const othersColors = useMemo(() => {
        return (Object.values(colors) as string[]).filter(
          (color) => !field.includes(color)
        );
      }, [colors, field]);
    
    const handlerColorEntered = (idx: number, color: string) => {
        setField((prev) => {
            const updated = [...prev];
            updated[idx] = color;
            return updated;
          });
          
    };
    
    const isValidMove = field.includes("");

    const resultMove = field.map((item) => {
        const key = Object.entries(colors).find(([, val]) => val === item)?.[0];
        if(key) return key;
        return "";
    });

    const clickMoveHandler = () => {
        moveHandler(resultMove);
        setField(defaultField);
    }

    return (
        <div className={style.wrapper}>
            <div className={style.header}>Bulls & Cows</div>
            {status === "active" && 
                <div className={style.content}>
                    <div className={style.turns}>Осталось ходов: {turns}</div>
                    <div className={style.gameField}>
                        {field.map((color, idx) => 
                            <ColorSelect color={color} index={idx} colorOptions={othersColors} selectHandler={handlerColorEntered} />
                        )}
                    </div>
                
                    <div className={style.nav}>
                        <button className={style.btnSend} onClick={clickMoveHandler} disabled={isValidMove}>Отправить</button>
                        <button className={style.btnStop} onClick={finishGameHandler}>Стоп</button>
                    </div>
                </div>
            }
            {status === "win" && <div className={style.win}>Ты выиграл</div>}
            {status === "loss" && 
                <div className={style.loss}>
                    <div className={style.headerLoss}>Ты проиграл, попробуй еще раз</div>
                    <div className={style.resultColors}>
                        {quest.map((item) => {
                            return(
                                <div className={`${style.cell} ${style[colors[item]]}`}></div>
                            )
                        })}
                    </div>
                </div>
            }
            {moves.length !== 0 && 
                <div className={style.resultsMoves}>
                    <div className={style.resultHeader}>Результаты ходов</div>
                    {moves.map((item) => {
                        return (
                            <ResultMove bulls={item.bulls} cows={item.cows} moveData={item.moveData} colors={colors}/>
                        )
                    })}
                </div>
            }
        </div>
    )
}