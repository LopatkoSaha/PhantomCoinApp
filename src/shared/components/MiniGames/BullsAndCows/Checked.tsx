import { useState, useEffect, useRef } from "react";

import style from "./Checked.module.scss";
import { TStatusStep } from "./BullsAndCows";

interface checkedProps {
  colorsList: Record<string, string>;
  quantityColors: number;
  exercise: number[];
  setStatusSteps: React.Dispatch<React.SetStateAction<TStatusStep[]>>;
  isActiveField: number;
  setIsActiveField: React.Dispatch<React.SetStateAction<number>>;
  indGameField: number;
}

interface MenuPosition {
  x: number;
  y: number;
}

export const Checked = ({
  colorsList,
  quantityColors,
  exercise,
  setStatusSteps,
  isActiveField,
  setIsActiveField,
  indGameField,
}: checkedProps) => {
  const [stateResult, setStateResult] = useState<number[]>(
    new Array(quantityColors).fill(0)
  );

  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [compliance, setCompliance] = useState({ bulls: 0, crows: 0 });

  const [dropdownDirection, setDropdownDirection] = useState<"down" | "up">(
    "down"
  );

  useEffect(() => {
    if (menuPosition && dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (dropdownRect.bottom > viewportHeight) {
        setDropdownDirection("up");
      } else {
        setDropdownDirection("down");
      }
    }
  }, [menuPosition]);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleRightClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (indGameField !== isActiveField) return;
    e.preventDefault();
    setMenuPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMenu = (index: number, newValue: number) => {
    setStateResult((prev) => {
      if (index >= 0 && index < prev.length) {
        const updatedArray = [...prev];
        updatedArray[index] = newValue;
        return updatedArray;
      }
      return prev;
    });
    setMenuPosition(null);
  };

  const validateCompare = !stateResult.includes(0);

  const handleCompare = () => {
    setIsActiveField((prev) => prev + 1);
    const result = { crows: 0, bulls: 0 };
    stateResult.forEach((item, ind) => {
      if (exercise.includes(item)) {
        result.crows++;
      }
      if (item === exercise[ind]) {
        result.bulls++;
      }
    });
    setCompliance((prev) => result);
    setStatusSteps((prev) => {
      const updateStatus = [...prev];
      updateStatus[indGameField].status = JSON.stringify(result);
      return updateStatus;
    });
  };

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.info}>Попытка {indGameField + 1}</div>
        <div
          className={`${style.containerTry} ${
            indGameField !== isActiveField ? style.disabled : ""
          }`}
        >
          {stateResult.map((item, index) => {
            return (
              <div
                className={`${style.card} ${
                  item === 0 ? style.noColor : style[colorsList[item]]
                }`}
                key={index}
                onContextMenu={(e) => {
                  handleRightClick(e);
                  setCurrentIndex(index);
                }}
              >
                {item === 0 ? "" : colorsList[item]}
              </div>
            );
          })}
          <div className={style.infoStep}>
            {validateCompare && indGameField === isActiveField ? (
              <button className={style.btnTry} onClick={handleCompare}>
                Ok
              </button>
            ) : (
              ""
            )}
            {indGameField < isActiveField && (
              <div>
                Коров: {compliance.crows}, Быков: {compliance.bulls}
              </div>
            )}
          </div>
        </div>
      </div>
      {menuPosition && (
        <div
          className={style.menuColors}
          ref={dropdownRef}
          style={{
            top: dropdownDirection === "down" ? menuPosition.y : "auto",
            bottom:
              dropdownDirection === "up"
                ? `calc(100vh - ${menuPosition.y}px)`
                : "auto",
            left: menuPosition.x,
          }}
        >
          <ul>
            {Object.keys(colorsList).map((item, ind) => {
              if (+item !== 0 && stateResult.includes(+item)) return;
              return (
                <li
                  className={`${style[colorsList[item]]}`}
                  onClick={() => handleMenu(currentIndex, +item)}
                  key={ind}
                >
                  {colorsList[item]}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
