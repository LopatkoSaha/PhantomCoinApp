import { useState, useEffect, useRef } from "react";

import style from "./MinesweeperField.module.scss";
import { MinesweeperCell } from "./MinesweeperCell";
import type { TGameData } from "./Minesweeper";

type TProps = {
    gameData: TGameData,
    moveHandler: (clickId: number) => void;
    flagHandler: (clickId: number) => void;
    finishGameHandler: () => void;
};

export const MinesweeperField = (props: TProps) => {
    const {fieldData, status, x, y, bombs, lastMove}  = props.gameData;
    const {moveHandler, flagHandler, finishGameHandler} = props;

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
      }, [ref, x, y]);

    const handleRightClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        if (status === "win" || status === "loss") return;
        const clickId = (e.target as HTMLDivElement).dataset.id;
        if (fieldData[+clickId!]?.isOpen) return;
        flagHandler(+clickId!);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (status === "win" || status === "loss") return;
        const clickId = (event.target as HTMLDivElement).dataset.id;
        if (fieldData[+clickId!]?.isOpen) return;
        if (fieldData[+clickId!]?.hasFlag) return;
            moveHandler(+clickId!);
      };
    
    const cells = fieldData.map((item) => {
        return <MinesweeperCell cellData={item} bombs={bombs} lastMove={lastMove} sizeGameField={sizeGameField} x={x} y={y}/>
    });

    const rows = Array.from({ length: y }, (_, idx) => {
        return (
            <div className={style.row} key={idx}>
                {cells.slice(idx * x, idx * x + x)}
            </div>
        )
    })

    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                <div className={style.nav}>
                    <button className={style.stop} onClick={finishGameHandler}>Стоп</button>
                </div>
                <div className={style.gameContainer}>
                    <div 
                        className={style.gameField}
                        onClick={handleClick}
                        onContextMenu={handleRightClick}
                        ref={ref}
                    >
                        {rows}
                    </div>
                </div>
            </div>        
        </div>
    )
}