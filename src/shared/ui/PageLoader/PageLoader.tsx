import { Loader } from "../Loader/Loader";
import style from "./PageLoader.module.scss";

interface PageLoaderProps {
  className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
  <div className={style.PageLoader}>
    <Loader />
  </div>
);
