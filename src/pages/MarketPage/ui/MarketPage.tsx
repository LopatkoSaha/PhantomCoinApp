import style from "./MarketPage.module.scss";
import { TableCourses } from "shared/components/TableCourses/TableCouses";

const MarketPage = () => {
  return (
    <div className={style.wrapperMarket}>
      <TableCourses />
    </div>
  );
};

export default MarketPage;
