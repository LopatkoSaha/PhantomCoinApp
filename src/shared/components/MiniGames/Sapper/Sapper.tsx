import { useState, useEffect, useMemo, useRef } from "react";

import style from "./Sapper.module.scss";
import { Complexity } from "shared/elements/Complexity/Complexity";

type TField = {
  isShow: number;
  isBomb: boolean;
  isFlag: boolean;
  value: number;
};

const configComplexity = {
  easy: {
    rows: 5,
    colums: 5,
    mine: 5,
  },
  medium: {
    rows: 10,
    colums: 10,
    mine: 10,
  },
  hard: {
    rows: 15,
    colums: 15,
    mine: 25,
  },
};

const collors: { [key: string]: string } = {
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

const generateBombPlaces = (
  array: any[],
  count: number,
  firstClickIndex: number
) => {
  if (count > array.length) {
    throw new Error("Количество заменяемых элементов больше длины массива!");
  }
  const indices = new Set();
  while (indices.size < count) {
    const randomIndex = Math.floor(Math.random() * array.length);
    if (randomIndex !== firstClickIndex) indices.add(randomIndex);
  }
  return array.map((item, index) => (indices.has(index) ? "B" : item));
};

export const Sapper = () => {
  const [sizeGameField, setSizeGameField] = useState({ width: 0, heigth: 0 });

  const [complexity, setComplexity] = useState<"easy" | "medium" | "hard">(
    "easy"
  );

  const [fields, setFields] = useState<TField[] | null>(null);

  const [flagsCounter, setFlagsCounter] = useState(
    configComplexity[complexity].mine
  );

  const [statusGame, setStatusGame] = useState<"play" | "win" | "losse">(
    "play"
  );

  const [firstClick, setFirstClick] = useState<number | null>(null);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let valueOpenedFields = 0;
    fields &&
      fields.forEach((item) => {
        if (item.isShow) valueOpenedFields = valueOpenedFields + 1;
      });
    if (
      fields &&
      valueOpenedFields === fields.length - configComplexity[complexity].mine
    )
      setStatusGame("win");
  }, [fields]);

  useEffect(() => {
    if (statusGame === "win") handlerWin();
    if (statusGame === "losse") handlerLosse();
  }, [statusGame]);

  useEffect(() => {
    if (ref.current) {
      const size = {
        width: ref.current.offsetWidth,
        heigth: ref.current.offsetHeight,
      };
      setSizeGameField(size);
    }
    createGameField();
  }, [ref, complexity]);

  const getClosestCells = useMemo(() => {
    const colums = configComplexity[complexity].colums;
    const rows = configComplexity[complexity].rows;
    return function (idx: number) {
      const isTop = idx < colums;
      const isBottom = idx >= colums * rows - colums;
      const isLeft = idx % colums === 0;
      const isRight = idx % colums === colums - 1;
      if (isTop && isLeft) {
        return [1, colums, colums + 1];
      }
      if (isTop && isRight) {
        return [colums - 2, 2 * colums - 2, 2 * colums - 1];
      }
      if (isBottom && isLeft) {
        return [
          colums * (rows - 2),
          colums * (rows - 2) + 1,
          colums * (rows - 1) + 1,
        ];
      }
      if (isBottom && isRight) {
        return [
          colums * (rows - 1) - 2,
          colums * (rows - 1) - 1,
          colums * rows - 2,
        ];
      }
      if (isTop) {
        return [
          idx - 1,
          idx + 1,
          idx + colums - 1,
          idx + colums,
          idx + colums + 1,
        ]; // 5 elems
      }
      if (isBottom) {
        return [
          idx - colums - 1,
          idx - colums,
          idx - colums + 1,
          idx - 1,
          idx + 1,
        ]; // 5 elems
      }
      if (isLeft) {
        return [
          idx - colums,
          idx - colums + 1,
          idx + 1,
          idx + colums,
          idx + colums + 1,
        ]; // 5 elems
      }
      if (isRight) {
        return [
          idx - colums - 1,
          idx - colums,
          idx - 1,
          idx + colums - 1,
          idx + colums,
        ]; // 5 elems
      }
      return [
        idx - colums - 1,
        idx - colums,
        idx - colums + 1,
        idx - 1,
        idx + 1,
        idx + colums - 1,
        idx + colums,
        idx + colums + 1,
      ]; // 8 elems
    };
  }, [complexity]);

  const createGameField = () => {
    const initArr = new Array(
      configComplexity[complexity].rows * configComplexity[complexity].colums
    ).fill(0);
    setFields(initArr);
  };

  const updateGameField = (clickIdx: number) => {
    if (fields) {
      const arrBombPlace = generateBombPlaces(
        fields,
        configComplexity[complexity].mine,
        clickIdx
      );
      const dataFields = arrBombPlace.map((item, i) => {
        return {
          isShow: i === clickIdx ? 1 : 0,
          isBomb: item ? true : false,
          isFlag: false,
          value: 0,
        };
      });
      const updatedFields = dataFields.map((field: any, idx: number) => {
        if (fields[idx].isBomb) {
          return;
        }
        const closestCellsIdx = getClosestCells(idx);
        const count = closestCellsIdx.reduce(
          (acc, index) => acc + (dataFields[index]?.isBomb ? 1 : 0),
          0
        );
        return { ...field, value: count as 0 };
      });
      setFields(updatedFields);
    }
  };

  const handleZiro = (idx: number, checkedCells: number[] = []) => {
    if (!fields || fields[idx].isShow === 1) return;
    const toggleShowFields = fields.map((field, i) =>
      i === idx ? { ...field, isShow: 1 } : field
    );
    setFields(toggleShowFields);
    const closestCells = getClosestCells(idx);
    closestCells.forEach((item) => {
      if (fields[item].isBomb) return;
      if (fields[item].isFlag) return;
      if (fields[item].isShow === 1) return;
      if (fields[item].value >= 0) {
        setFields((prev) => {
          if (!prev) return prev;
          const newFields = [...prev];
          newFields[item].isShow = 1;
          return newFields;
        });
      }
      if (fields[item].value === 0 && !checkedCells.includes(item)) {
        checkedCells.push(item);
        handleZiro(item, checkedCells);
      }
    });
  };

  const handleLeftClick = (idx: number) => {
    if (!firstClick) {
      setFirstClick(idx);
      updateGameField(idx);
    }
    if (statusGame === "win" || statusGame === "losse") return;
    if (fields && fields[idx].isFlag) return;
    if (fields && fields[idx].isShow) return;
    if (fields && fields[idx].isBomb) return setStatusGame("losse");
    if (fields && fields[idx].value > 0) {
      const toggleShowFields = fields.map((field, i) =>
        i === idx ? { ...field, isShow: 1 } : field
      );
      setFields(toggleShowFields);
      return;
    }
    if (fields && fields[idx].value === 0) {
      handleZiro(idx);
    }
  };

  const handleRigthClick = (idx: number) => {
    if (!firstClick) return;
    if (statusGame === "win" || statusGame === "losse") return;
    if (
      (fields && !fields[idx].isFlag && flagsCounter === 0) ||
      (fields && fields[idx].isShow)
    )
      return;
    fields && fields[idx].isFlag
      ? setFlagsCounter((prev) => prev + 1)
      : setFlagsCounter((prev) => prev - 1);
    setFields((prev) => {
      if (!prev) return prev;
      const newFields = [...prev];
      newFields[idx].isFlag = !newFields[idx].isFlag;
      return newFields;
    });
  };

  const offDefault = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
  };

  const handlerWin = () => {
    handlerLosse();
  };

  const handlerLosse = () => {
    if (!fields) return;
    const showMine = fields.map((item) => {
      if (item.isBomb) {
        item.isShow = 1;
        item.isFlag = false;
      }
      return item;
    });
    fields && setFields(showMine);
  };

  const handleReset = () => {
    setFirstClick(null);
    setStatusGame("play");
    setFlagsCounter(configComplexity[complexity].mine);
    createGameField();
  };

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.nav}>
          <Complexity
            complexity={complexity}
            setComplexity={setComplexity}
            actions={[handleReset]}
          />
          <div className={style.flagsCounter}>
            Колличество флагов {flagsCounter}
          </div>
          <button className={style.btnReset} onClick={handleReset}>
            RESET
          </button>
        </div>
        <div className={style.gameContainer}>
          <div className={style.gameinfo}>
            {statusGame === "play" && "Отметте все мины флагами"}
            {statusGame === "win" && "Вы победили"}
            {statusGame === "losse" &&
              "Вы проиграли, попробуйте еще нажав RESET"}
          </div>
          <div
            className={style.gameField}
            ref={ref}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${configComplexity[complexity].rows}, 1fr)`,
              gridTemplateRows: `repeat(${configComplexity[complexity].colums}, 1fr)`,
            }}
          >
            {fields &&
              fields.map((item, idx) => {
                return (
                  <div
                    style={{
                      width: `${
                        sizeGameField.width /
                        configComplexity[complexity].colums
                      }px`,
                      height: `${
                        sizeGameField.heigth / configComplexity[complexity].rows
                      }px`,
                    }}
                    className={`${style.cell} ${
                      fields[idx].isShow
                        ? style[collors[item.value.toString()]]
                        : style.close
                    } ${fields[idx].isShow && fields[idx].isBomb && style.bomb}
                    ${fields[idx].isFlag && style.flag}
                    `}
                    key={Date.now() + idx}
                    onClick={(e) => {
                      handleLeftClick(idx);
                    }}
                    onContextMenu={(e) => {
                      offDefault(e);
                      handleRigthClick(idx);
                    }}
                  ></div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
