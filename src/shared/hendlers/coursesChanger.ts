import { setCurrencyCourses } from "app/store/slices/coursesSlice";
import { AppDispatch } from "app/store/store";

const cousesGenerate = (currencyList: Record<string, string>) => {
  const currencyNames = Object.keys(currencyList);
  const range = Math.random() * 0.4 + 0.8; // return number from 0,8 to 1,2
  const randomNameCurrency =
    currencyNames[Math.floor(Math.random() * currencyNames.length)];
  return { [randomNameCurrency]: range };
};

export const cousesChanger = (
  intervalChenged: number,
  dispatch: AppDispatch,
  currencyList: Record<string, string>
) => {
  setInterval(() => {
    const valueChanged = cousesGenerate(currencyList);
    dispatch(setCurrencyCourses(valueChanged));
  }, intervalChenged);
};
