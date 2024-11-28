import { useState, useEffect, useMemo, useRef } from "react";

import style from "./Sapper.module.scss";

type TConfig = {
  rows: number;
  colums: number;
  mine: number;
};

const config: TConfig = {
  rows: 15,
  colums: 15,
  mine: 20,
};

const collors = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  B: "boom",
};

const generateBombPlaces = (array: any[], count: number) => {
  if (count > array.length) {
    throw new Error("Количество заменяемых элементов больше длины массива!");
  }
  const indices = new Set();
  while (indices.size < count) {
    const randomIndex = Math.floor(Math.random() * array.length);
    indices.add(randomIndex);
  }
  return array.map((item, index) => (indices.has(index) ? "B" : item));
};

export const Sapper = () => {
  const [fileds, setFileds] = useState<
    (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | "B")[]
  >([]);
  const [isOpenedfileds, setIsOpenedFileds] = useState<any[]>([]);

  const [sizeGameField, setSizeGameField] = useState({ width: 0, heigth: 0 });

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      const size = {
        width: ref.current.offsetWidth,
        heigth: ref.current.offsetHeight,
      };
      setSizeGameField(size);
    }
    const initArr = new Array(config.rows * config.colums).fill(0);
    setFileds(generateBombPlaces(initArr, config.mine));
    setIsOpenedFileds(initArr);
  }, [ref]);

  const getClosestCells = useMemo(() => {
    return function (idx: number) {
      const isTop = idx < config.colums;
      const isBottom = idx >= config.colums * config.rows - config.colums;
      const isLeft = idx % config.colums === 0;
      const isRight = idx % config.colums === config.colums - 1;
      if (isTop && isLeft) {
        return [1, config.colums, config.colums + 1];
      }
      if (isTop && isRight) {
        return [
          config.colums - 2,
          2 * config.colums - 2,
          2 * config.colums - 1,
        ];
      }
      if (isBottom && isLeft) {
        return [
          config.colums * (config.rows - 2),
          config.colums * (config.rows - 2) + 1,
          config.colums * (config.rows - 1) + 1,
        ];
      }
      if (isBottom && isRight) {
        return [
          config.colums * (config.rows - 1) - 2,
          config.colums * (config.rows - 1) - 1,
          config.colums * config.rows - 2,
        ];
      }
      if (isTop) {
        return [
          idx - 1,
          idx + 1,
          idx + config.colums - 1,
          idx + config.colums,
          idx + config.colums + 1,
        ]; // 5 elems
      }
      if (isBottom) {
        return [
          idx - config.colums - 1,
          idx - config.colums,
          idx - config.colums + 1,
          idx - 1,
          idx + 1,
        ]; // 5 elems
      }
      if (isLeft) {
        return [
          idx - config.colums,
          idx - config.colums + 1,
          idx + 1,
          idx + config.colums,
          idx + config.colums + 1,
        ]; // 5 elems
      }
      if (isRight) {
        return [
          idx - config.colums - 1,
          idx - config.colums,
          idx - 1,
          idx + config.colums - 1,
          idx + config.colums,
        ]; // 5 elems
      }
      return [
        idx - config.colums - 1,
        idx - config.colums,
        idx - config.colums + 1,
        idx - 1,
        idx + 1,
        idx + config.colums - 1,
        idx + config.colums,
        idx + config.colums + 1,
      ]; // 8 elems
    };
  }, [config]);

  fileds.forEach((_: any, idx: number) => {
    if (fileds[idx] === "B") {
      return;
    }
    const closestCellsIdx = getClosestCells(idx);
    let count = 0;
    closestCellsIdx.forEach((index) => {
      if (fileds[index] === "B") {
        count++;
      }
    });
    fileds[idx] = count as 0;
  });

  const handleZiro = (idx: number, checkedCells: number[] = []) => {
    if (isOpenedfileds[idx] === 1) return;
    setIsOpenedFileds((prev) => {
      const newArr = [...prev];
      newArr[idx] = 1;
      return newArr;
    });
    const closestCells = getClosestCells(idx);
    closestCells.forEach((item) => {
      if (isOpenedfileds[item] === 1) return;
      if (fileds[item] !== "B" && fileds[item] > 0)
        setIsOpenedFileds((prev) => {
          const newArr = [...prev];
          newArr[item] = 1;
          return newArr;
        });
      if (
        fileds[item] === 0 &&
        isOpenedfileds[item] === 0 &&
        !checkedCells.includes(item)
      ) {
        checkedCells.push(item);
        handleZiro(item, checkedCells);
      }
    });
  };

  const handleClick = (idx: number) => {
    if (isOpenedfileds[idx] === 1) return;
    if (fileds[idx] === "B") return losseHandler();
    if (fileds[idx] > 0) {
      setIsOpenedFileds((prev) => {
        const newArr = [...prev];
        newArr[idx] = 1;
        return newArr;
      });
      return;
    }
    if (fileds[idx] === 0) {
      handleZiro(idx);
    }
  };

  const losseHandler = () => {
    const newIsOpenedFileds = [...isOpenedfileds];
    fileds.forEach((item, idx) => {
      if (item === "B") {
        newIsOpenedFileds[idx] = 1;
      }
    });
    setIsOpenedFileds(newIsOpenedFileds);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.nav}>Navigation</div>
        <div className={style.gameContainer}>
          <div className={style.gameinfo}>INFO</div>
          <div
            className={style.gameField}
            ref={ref}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${config.rows}, 1fr)`,
              gridTemplateRows: `repeat(${config.colums}, 1fr)`,
            }}
          >
            {fileds.map((item, idx) => {
              return (
                <div
                  style={{
                    width: `${sizeGameField.width / config.colums}px`,
                    height: `${sizeGameField.heigth / config.rows}px`,
                  }}
                  className={`${style.cell} ${
                    isOpenedfileds[idx] === 1
                      ? style[collors[item]]
                      : style.close
                  }`}
                  key={Date.now() + idx}
                  onClick={() => {
                    handleClick(idx);
                  }}
                >
                  {item === "B" ? "B" : ""}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
