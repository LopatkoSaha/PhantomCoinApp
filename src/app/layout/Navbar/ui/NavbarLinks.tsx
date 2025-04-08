import style from "./Navbar.module.scss";
import { AppLink } from "shared/elements/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { useIsAuth } from "shared/hooks/useCheckAuth";

export const NavbarLinks = () => {
  const [isUser] = useIsAuth();

  return (
    <div
      className={`${style.itemLinks} animate__animated animate__backInDown`}
    >
      <AppLink to={RoutePath.main} className={style.item}>
        <span>Главная</span>
      </AppLink>
      <AppLink to={RoutePath.about} className={style.item}>
        <span>О сайте</span>
      </AppLink>
      <AppLink to={RoutePath.market} className={style.item}>
        <span>Рынок</span>
      </AppLink>
      {isUser && 
        <AppLink to={RoutePath.game} className={style.item}>
          Играть
        </AppLink>
      }
    </div>
  );
};
