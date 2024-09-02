import style from "../Loader/Loader.module.scss";

export const Loader: React.FC = () => {
  return (
    <div className={style.loaderContainer}>
      <div className={style.spinner}></div>
    </div>
  );
};
