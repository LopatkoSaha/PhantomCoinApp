import style from "./TextComponent.module.scss";

const TextComponent = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className={style.textWrapper}>
      <h3 className={style.title}>{title}</h3>
      <p className={style.description}>{description}</p>
    </div>
  );
};

export default TextComponent;
