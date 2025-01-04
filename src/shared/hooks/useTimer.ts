import { useEffect, useRef, useState } from "react";

export function useTimer(gameTime: number) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const endOfGame = useRef(0);
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setTimeLeft(Math.round((endOfGame.current - Date.now()) / 1000));
    }, 500);

    // Очищаем интервал при размонтировании
    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, []);

  function stopTimer() {
    setIsWin(true);
    if (timerId.current) clearTimeout(timerId.current);
  }

  function startTimer(loseHandler: () => void): void {
    // Сброс предыдущего таймера, если он существует
    if (timerId.current) clearTimeout(timerId.current);

    timerId.current = setTimeout(() => {
      loseHandler();
    }, gameTime * 1000);

    endOfGame.current = Date.now() + gameTime * 1000;
    setIsWin(false);
  }

  return {
    timeLeft: timeLeft > 0 && !isWin ? timeLeft.toString() : "-",
    startTimer,
    stopTimer,
  };
}
