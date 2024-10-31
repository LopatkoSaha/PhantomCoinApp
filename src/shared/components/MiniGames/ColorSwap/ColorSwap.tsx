import style from "./ColorCircules.module.scss";

import React, { useState, useEffect } from "react";

export const ColorSwap: React.FC = () => {
  // Исходные цвета
  const allColors = ["red", "green", "blue", "yellow", "purple"];

  // Случайно перемешиваем массив цветов для цели
  const generateRandomColors = () =>
    [...allColors].sort(() => Math.random() - 0.5);

  const [targetColors, setTargetColors] = useState<string[]>(
    generateRandomColors()
  );
  const [colors, setColors] = useState<string[]>([...allColors]);
  const [selected, setSelected] = useState<number[]>([]);
  const [locked, setLocked] = useState<boolean[]>(
    Array(allColors.length).fill(false)
  ); // Массив блокировки элементов
  const [movesLeft, setMovesLeft] = useState<number>(5); // Оставшиеся ходы
  const [gameOver, setGameOver] = useState<boolean>(false); // Флаг окончания игры

  useEffect(() => {
    // Если угаданы все элементы или закончились ходы, игра завершена
    if (movesLeft === 0 || locked.every(Boolean)) {
      setGameOver(true);
    }
  }, [movesLeft, locked]);

  // Обработчик клика на элемент
  const handleClick = (index: number) => {
    // Если элемент заблокирован или игра окончена, ничего не делаем
    if (locked[index] || gameOver) return;

    // Если элемент уже выбран, снимаем выбор
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index));
    } else {
      // Если выбранных элементов меньше 2, добавляем выбранный элемент
      if (selected.length < 2) {
        setSelected([...selected, index]);
      }
    }

    // Если выбрано два элемента, меняем их местами
    if (selected.length === 1) {
      swapElements(selected[0], index);
      setSelected([]); // Сбрасываем выбор
    }
  };

  // Функция для смены местами двух элементов
  const swapElements = (firstIndex: number, secondIndex: number) => {
    const newColors = [...colors];
    [newColors[firstIndex], newColors[secondIndex]] = [
      newColors[secondIndex],
      newColors[firstIndex],
    ];
    setColors(newColors);
    checkIfCorrect(newColors); // Проверяем после перемещения
    setMovesLeft(movesLeft - 1); // Уменьшаем количество оставшихся ходов
  };

  // Проверка, угаданы ли элементы
  const checkIfCorrect = (currentColors: string[]) => {
    const newLocked = [...locked];
    currentColors.forEach((color, index) => {
      if (color === targetColors[index]) {
        newLocked[index] = true; // Блокируем правильный элемент
      }
    });
    setLocked(newLocked);
  };

  const resetGame = () => {
    setTargetColors(generateRandomColors());
    setColors([...allColors]);
    setLocked(Array(allColors.length).fill(false));
    setMovesLeft(5);
    setGameOver(false);
    setSelected([]);
  };

  return (
    <div>
      <h3>Угадайте цветовой ряд за {movesLeft} ходов</h3>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        {colors.map((color, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: color,
              opacity: locked[index] ? 0.5 : 1, // Полупрозрачный для угаданных элементов
              border: selected.includes(index)
                ? "5px solid black"
                : "1px solid gray",
              cursor: locked[index] || gameOver ? "not-allowed" : "pointer",
            }}
          />
        ))}
      </div>
      {gameOver && (
        <div>
          <h4>
            {locked.every(Boolean)
              ? "Вы победили!"
              : "Игра окончена! Попробуйте снова."}
          </h4>
          <button onClick={resetGame}>Сбросить игру</button>
        </div>
      )}
    </div>
  );
};
