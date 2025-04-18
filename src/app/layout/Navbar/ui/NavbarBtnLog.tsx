import { useDispatch } from "react-redux";

import style from "./Navbar.module.scss";
import { Button, ButtonSize, ButtonTheme } from "shared/elements/Button/Button";
import { AppDispatch } from "app/store/store";
import { showModal } from "app/store/slices/modalSlice";
import { setUser } from "app/store/slices/userSlice";
import { useAppSelector } from "app/store/useAppSelector";
import { axiosLogout } from "api/axios/userAuth";
import { useIsAuth } from "shared/hooks/useCheckAuth";

type logProps = {
  handler: () => void;
};

export const NavbarBtnLog = ({ handler }: logProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [isAuth] = useIsAuth();

  const handleShowModal = () => {
    dispatch(showModal({ modalType: "log" }));
    handler();
  };

  const handlerLoginout = () => {
    dispatch(setUser({
      id: "",
      name: "",
      walletId: "",
    }));
    axiosLogout(dispatch);
  }

  return (
    <>
      {!isAuth && (
        <div className={style.navBtns}>
          <Button
            cb={handleShowModal}
            isActive={true}
            size={ButtonSize.M}
            theme={ButtonTheme.LIGTH}
            title={"Войти"}
            animation="animate__animated animate__backInRight"
          />
        </div>
      )}
      {isAuth && (
        <div className={style.navBtns}>
          <Button
            cb={handlerLoginout}
            isActive={true}
            size={ButtonSize.M}
            theme={ButtonTheme.LIGTH}
            title={"Выйти"}
            animation="animate__animated animate__backInRight"
          />
        </div>
      )}
    </>
  );
};
