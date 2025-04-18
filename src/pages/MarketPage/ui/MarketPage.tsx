import style from "./MarketPage.module.scss";
import { TableCourses } from "shared/components/TableCourses/TableCouses";
import { useAppSelector } from "app/store/useAppSelector";

export const MarketPage = () => {
  const currentCourses = useAppSelector((state) => state.courses);

  const data = Object.entries(currentCourses)
  .filter(([key]) => key !== "id" && key !== "created_at")
  .map(([key, value]) => {
    return {
      name: key,
      value: Number(value)
    }
  })

  return (
    <>
      <TableCourses />
    </>
  );
};

