import style from "./CheckIQ.module.scss";

type TProps = {
    x: number;
    y: number;
    fieldData: Record <string, any>[];
    exercise: number;
}

export const GameResult = ({x, y, fieldData, exercise}: TProps) => {
    const cells = Array.from({length: x * y}).map((_, idx) => {
        const itemData = fieldData.find((item) => item.index === idx);
        return (
            <div 
                className={`
                    ${style.cell} 
                    ${itemData?.isOpen ? style.isOpen : style.isClose}
                    ${itemData?.value === exercise && style.exercise}
                `}
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