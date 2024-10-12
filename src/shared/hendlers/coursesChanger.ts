import { setCurrencyCourses } from "app/store/slices/coursesSlice";
import { AppDispatch } from "app/store/store";

const cousesGenerate = (
  currencyList: Record<string, string>,
  preValue: Record<string, number>
) => {
  const currencyNames = Object.keys(currencyList);
  const range = Math.random() * 0.4 + 0.8; // return number from 0,8 to 1,2
  const randomNameCurrency =
    currencyNames[Math.floor(Math.random() * currencyNames.length)];
  return { [randomNameCurrency]: range * (preValue[randomNameCurrency] || 1) };
};

export const cousesChanger = (
  intervalChenged: number,
  dispatch: AppDispatch,
  currencyList: Record<string, string>,
  preValue: Record<string, number>
) => {
  setInterval(() => {
    const valueChanged = cousesGenerate(currencyList, preValue);
    dispatch(setCurrencyCourses(valueChanged));
  }, intervalChenged);
};
