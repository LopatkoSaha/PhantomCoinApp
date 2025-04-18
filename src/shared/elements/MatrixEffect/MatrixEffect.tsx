import { useEffect, useState } from "react";

import style from "./MatrixEffect.module.scss";

const MATRIX_SYMBOLS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";

function getRandomChar() {
  return MATRIX_SYMBOLS[Math.floor(Math.random() * MATRIX_SYMBOLS.length)];
}

export const MatrixEffect = () => {
  const [matrixColumns, setMatrixColumns] = useState<number[]>([]);

  useEffect(() => {
    const columns = new Array(Math.floor(window.innerWidth / 20)).fill(0);
    setMatrixColumns(columns);
  }, []);

  return (
    <div className={style.matrixContainer}>
      {matrixColumns.map((_, index) => (
        <MatrixColumn key={index} />
      ))}
    </div>
  );
}

function MatrixColumn() {
  const [text, setText] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setText((prev) => {
        const newText = [...prev, getRandomChar()];
        return newText.length > 20 ? newText.slice(1) : newText;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={style.matrixColumn}>
      {text.map((char, i) => (
        <span key={i} style={{ opacity: i / 20 }}>
          {char}
        </span>
      ))}
    </div>
  );
}
