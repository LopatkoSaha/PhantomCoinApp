import style from "./MinesweeperField.module.scss";

type TProps = {
    cellData: {
        cellId: number,
        hasBomb: boolean,
        isOpen: boolean,
        hasFlag: boolean,
        bombsAround: number,
        cellsAround: number[],
    },
    bombs: number[],
    lastMove: number | null,
    sizeGameField: Record<string, number>,
    x: number,
    y: number,
}

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

export const MinesweeperCell = ({cellData, bombs = [], lastMove, sizeGameField, x, y}: TProps) => {
    let className = style.cell;
    if (bombs.includes(cellData.cellId)) {
        className += ` ${style.bomb}`;
        if (lastMove && lastMove === cellData.cellId) {
            className += ` ${style.lastMoveBomb}`;
        }
    } else if (cellData.isOpen) {
        className += ` ${style[collors[cellData.bombsAround]]}`;
    } else {
        className += ` ${style.close}`;
    }
    if (cellData.hasFlag) {
        className += ` ${style.flag}`;
    }
    
    return (
        <div 
            style={{
                width: `${sizeGameField.width / x}px`,
                height: `${sizeGameField.heigth / y}px`,
            }}
            className = {className}
            data-id ={cellData.cellId}
            key={cellData.cellId}
        ></div>
    );
}