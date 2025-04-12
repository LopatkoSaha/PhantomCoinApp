import { useState } from "react";

import style from "./BullsCows.module.scss";

type TProps = {
    color: string;
    index: number;
    colorOptions: string[];
    selectHandler: (index: number, color: string) => void;
};

export const ColorSelect = ({color, index, colorOptions, selectHandler}: TProps) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);

    const selectColorHandler = (e: React.MouseEvent<HTMLElement>) => {
        setShowDropdown(false);
        setMenuPosition(null);
        const selectedColor = (e.target as HTMLElement).dataset.color;
        if(!selectedColor) return;
        selectHandler(index, selectedColor);
    }

    const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
        setShowDropdown(true);
        setMenuPosition({ x: e.clientX, y: e.clientY });
    }
    return (
        <>
            <div
                className={`${style.cell} ${style[color]}`}
                onClick={clickHandler}
            >
            </div>
            {showDropdown && 
                <div
                    className={style.dropdown} 
                    onClick={selectColorHandler}
                >
                <ul
                    style={{
                        left: menuPosition!.x,
                        top: menuPosition!.y,
                    }}
                >
                    {colorOptions.map((item, idx) => {
                        return (
                            <li
                                className={style[item]}
                                data-color ={item}
                                key={idx}
                            >
                                {item}
                            </li>
                        )
                    })}
                </ul>
                </div>
            }
        </>
    )
}