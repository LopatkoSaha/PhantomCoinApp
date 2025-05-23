import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import style from "./Navbar.module.scss";
import { NavbarLogo } from "./NavbarLogo";
import { NavbarLinks } from "./NavbarLinks";
import { NavbarAdmin } from "./NavbarAdmin";
import { NavbarBtnLog } from "./NavbarBtnLog";
import { NavbarBtnReg } from "./NavbarBtnReg";
import { AppLink } from "shared/elements/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { useAppSelector } from "app/store/useAppSelector";
import { AppDispatch } from "app/store/store";
import { userGet } from "api/axios/userGet";
import { walletGet } from "api/axios/walletGet";

export const Navbar = () => {
  const dispatch: AppDispatch = useDispatch();
  const [showBurgerBtn, setShowBurgerBtn] = useState(true);
  const user = useAppSelector((state) => state.user);


  useEffect(() => {
    userGet(dispatch);
    walletGet(dispatch);
  },[])

  const hendlerBurger = () => {
    setShowBurgerBtn((prev) => !prev);
  };

  return (
    <div className={style.Navbar}>
      <NavbarLogo />
      <div className={style.NavPanel}>
        <NavbarLinks />
        {user?.name && (
          <AppLink to={RoutePath.personal} className={style.iconUser}>
            <div className={style.personalBtn}>
              <img
              className={style.personalImg}
                src="data:image/jpeg;base64,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"
                alt="user"
              />
            </div>
          </AppLink>
        )}
        <NavbarAdmin />
        <div className={style.NavBtns}>
          <NavbarBtnLog handler={hendlerBurger} />
          <NavbarBtnReg handler={hendlerBurger} />
        </div>
      </div>
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
