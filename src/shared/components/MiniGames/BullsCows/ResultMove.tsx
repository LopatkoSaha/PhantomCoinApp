import style from "./BullsCows.module.scss";

type TProps = {
    bulls?: number;
    cows?: number;
    moveData: string[];
    colors: Record<string, string>;
}

export const ResultMove = ({bulls, cows, moveData, colors}: TProps) => {
    return (
        <div className={style.resultMove}>
            <div className={style.resultBullsCows}>Bulls: {bulls}, Cows: {cows}</div>
            <div className={style.resultColors}>
                {moveData.map((item) => {
                    return(
                        <div className={`${style.cell} ${style[colors[item]]}`}></div>
                    )
                })}
            </div>
        </div>
    )
}