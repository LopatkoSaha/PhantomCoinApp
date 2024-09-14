import style from "./Navbar.module.scss";

export const NavbarLogo = () => {
  return (
    <div className={`${style.logo} animate__animated animate__backInLeft`}>
      <img src="/logo-P-square-slogan.png" alt="Phantom" />
      <p className={style.logoText}>
        Phantom <br /> Coin
      </p>
    </div>
  );
};
