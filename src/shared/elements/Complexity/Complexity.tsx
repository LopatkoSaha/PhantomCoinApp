import { useState } from "react";

import style from "./Complexity.module.scss";

type Props = {
  complexity: "easy" | "medium" | "hard";
  setComplexity: React.Dispatch<
    React.SetStateAction<"easy" | "medium" | "hard">
  >;
  actions: Array<() => void>;
};

export const Complexity: React.FC<Props> = ({
  complexity,
  setComplexity,
  actions,
}) => {
  const handlChangeComplexity = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setComplexity(event.target.value as "easy" | "medium" | "hard");
    actions.forEach((action) => action());
  };
  return (
    <div className={style.complexity}>
      <label htmlFor="dropdown">Сложность: </label>
      <select id="dropdown" value={complexity} onChange={handlChangeComplexity}>
        <option value="easy">Легко</option>
        <option value="medium">Средне</option>
        <option value="hard">Сложно</option>
      </select>
    </div>
  );
};
