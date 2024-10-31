import style from "./Navbar.module.scss";

export const NavbarLogo = () => {
  return (
    <div className={`${style.logo} animate__animated animate__backInLeft`}>
      {/* <div className={style.img}>
        <img src="\logo-P-square-slogan.png" alt="Phantom" />
      </div> */}
      <div className={style.logoText}>
        Phantom <br /> Coin
      </div>
    </div>
  );
};
