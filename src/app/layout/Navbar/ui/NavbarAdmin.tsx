import style from "./Navbar.module.scss";
import { AppLink } from "shared/elements/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { useAppSelector } from "app/store/useAppSelector";

export const NavbarAdmin = () => {
    const user = useAppSelector((state) => state.user);

  return (
    <>
        {user ? 
            <div
                className={`${style.itemLinks} animate__animated animate__backInDown`}
            >
                {user?.permission.users ? 
                    <AppLink to={RoutePath.adminUsers} className={style.item}>
                        <span>Юзеры</span>
                    </AppLink>
                : null
                }
                {user?.permission.wallets ?
                    <AppLink to={RoutePath.adminWallets} className={style.item}>
                        <span>Кошельки</span>
                    </AppLink>
                : null
                }
                {user?.permission.games ?
                    <AppLink to={RoutePath.adminGames} className={style.item}>
                        <span>Игры</span>
                    </AppLink>
                : null
                }
            </div>
        : null}
    </>
  );
};