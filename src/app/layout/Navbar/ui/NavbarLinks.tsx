import { useState } from "react";
import { useDispatch } from "react-redux";

import style from "./Navbar.module.scss";
import { AppLink } from "shared/elements/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { AppDispatch } from "app/store/store";
import { toggleGames } from "app/store/slices/toggleGamesSlice";
import { nameGames } from "pages/GamePage/ui/GamePage";

export const NavbarLinks = () => {
  const [showGameMenu, setShowGameMenu] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const lineGames = Object.keys(nameGames);

  const handlToggleGame = (nameGame: string) => {
    dispatch(toggleGames(nameGame));
    setShowGameMenu(false);
  };

  return (
    <div
      className={`${style.itemLinks} animate__animated animate__backInDown`}
      onClick={(e) => {
        if ((e.target as HTMLDivElement).id === "wrapper")
          setShowGameMenu(false);
      }}
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
      <div className={style.gameMenu} onClick={() => setShowGameMenu(true)}>
        Играть
      </div>
      {showGameMenu && (
        <div className={style.gameMenuWrapper} id="wrapper">
          <div className={style.gameMenu}>
            {lineGames.map((nameGame: string, index: number) => {
              return (
                <AppLink to={RoutePath.game} className={style.item} key={index}>
                  <div
                    className={style.nameGame}
                    onClick={() => handlToggleGame(`${nameGame}`)}
                  >
                    {nameGame}
                  </div>
                </AppLink>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
