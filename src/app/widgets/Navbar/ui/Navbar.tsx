import { useState } from "react";

import style from "./Navbar.module.scss";
import { NavbarLogo } from "./NavbarLogo";
import { NavbarLinks } from "./NavbarLinks";
import { NavbarBtnLog } from "./NavbarBtnLog";
import { NavbarBtnReg } from "./NavbarBtnReg";

export const Navbar = () => {
  const [showBurgerBtn, setShowBurgerBtn] = useState(true);

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
