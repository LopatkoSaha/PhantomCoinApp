import style from "./NotFoundPage.module.scss";

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
  return <div className={style.NotFoundPage}>Страница не найдена</div>;
};
