import { useState } from "react";

import style from "./Navbar.module.scss";
import { NavbarLogo } from "./NavbarLogo";
import { NavbarLinks } from "./NavbarLinks";
import { NavbarBtnLog } from "./NavbarBtnLog";
import { NavbarBtnReg } from "./NavbarBtnReg";
import { AppLink } from "shared/elements/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { useAppSelector } from "app/store/useAppSelector";

export const Navbar = () => {
  const [showBurgerBtn, setShowBurgerBtn] = useState(true);
  const currentUser = useAppSelector((state) => state.user);

  const hendlerBurger = () => {
    setShowBurgerBtn((prev) => !prev);
  };

  return (
    <div className={style.Navbar}>
      <NavbarLogo />
      <div className={style.NavPanel}>
        <NavbarLinks />
        <div className={style.NavBtns}>
          <NavbarBtnLog handler={hendlerBurger} />
          <NavbarBtnReg handler={hendlerBurger} />
        </div>
      </div>
      {Object.keys(currentUser).length > 0 && (
        <AppLink to={RoutePath.personal} className={style.iconUser}>
          <div className={style.personalBtn}>
            <img
              src="https://avatars.githubusercontent.com/u/113365148?v=4"
              alt="user"
            />
          </div>
        </AppLink>
      )}
      {showBurgerBtn && (
        <div
          className={`${style.BtnBurger} animate__animated animate__backInRight`}
          onClick={hendlerBurger}
        ></div>
      )}
      {!showBurgerBtn && (
        <div
          className={`${style.WrapperBurger} animate__animated animate__backInRight`}
          onClick={(e) => {
            if ((e.target as HTMLDivElement).id === "ContainerBurger") return;
            setShowBurgerBtn(true);
          }}
        >
          <div className={style.ContainerBurger} id="ContainerBurger">
            <NavbarLinks />
            <div className={style.BtnsBurger}>
              <NavbarBtnLog handler={hendlerBurger} />
              <NavbarBtnReg handler={hendlerBurger} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
