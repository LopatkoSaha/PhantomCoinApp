import {useState, useEffect} from "react";

import style from "./CheckIQ.module.scss";

type TProps = {
    endOfGame: number;
    stopInterval: boolean;
    handleFinish: () => void;
  };

export const GameTimer = ({ endOfGame, stopInterval ,handleFinish }: TProps) => {
    const [timer, setTimer] = useState<number | null>(null);
    
    useEffect(() => {
        const TimerInterval = setInterval(() => {
            if (stopInterval) {
                clearInterval(TimerInterval);
                return;
            }
            const timeLeft = Math.floor((endOfGame - Date.now()) / 1000);
            setTimer(timeLeft > 0 ? timeLeft : 0);
            if(timeLeft === -1) {
                handleFinish();
                clearInterval(TimerInterval);
            }
        }, 500);
        return () => clearInterval(TimerInterval);
    }, [stopInterval])

    return(
        <div className={style.timer}>Осталось: {timer} сек</div>
    )
}