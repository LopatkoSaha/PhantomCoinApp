import style from "./CheckIQ.module.scss";

type Tprops = {
    x: number;
    y: number;
    fieldData: Record <string, any>[];
    handleClick: (e: React.MouseEvent<HTMLElement>) => void;
}

export const GameField = ({x, y, fieldData, handleClick}: Tprops) => {

    const cells = Array.from({length: x * y}).map((_, idx) => {
        const itemData = fieldData.find((item) => item.index === idx);
        return (
            <div 
                className={`${style.cell} ${itemData?.isOpen ? style.isOpen : style.isClose}`}
                data-idx={idx}
                key={idx}
            >
                {itemData?.value}
            </div>
        )
    });

    const rows = Array.from({ length: y }, (_, idx) => {
        return (
            <div className={style.row}
                key={idx}
                onClick={handleClick}
            >
                {cells.slice(idx * x, idx * x + x)}
            </div>
        )
    });

    return (
        <div className={style.gameField}>
            {rows}
        </div>
    );
}