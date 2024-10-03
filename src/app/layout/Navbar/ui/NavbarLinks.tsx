import style from "./Navbar.module.scss";
import { AppLink } from "shared/elements/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";

export const NavbarLinks = () => {
  return (
    <div className={`${style.itemLinks} animate__animated animate__backInDown`}>
      <AppLink to={RoutePath.main} className={style.item}>
        <span>Главная</span>
      </AppLink>
      <AppLink to={RoutePath.about} className={style.item}>
        <span>О сайте</span>
      </AppLink>
      <AppLink to={RoutePath.buy} className={style.item}>
        <span>Покупка валюты</span>
      </AppLink>
      <AppLink to={RoutePath.market} className={style.item}>
        <span>Рынок</span>
      </AppLink>
    </div>
  );
};
