import { Loader } from "../Loader/Loader";
import style from "./PageLoader.module.scss";

export const PageLoader = () => (
  <div className={style.PageLoader}>
    <Loader />
  </div>
);
