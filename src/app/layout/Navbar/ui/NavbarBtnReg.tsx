import { useDispatch } from "react-redux";

import style from "./Navbar.module.scss";
import { Button, ButtonSize, ButtonTheme } from "shared/elements/Button/Button";
import { AppDispatch } from "app/store/store";
import { showModal } from "app/store/slices/modalSlice";
import { useIsAuth } from "shared/hooks/useCheckAuth";

export const NavbarBtnReg = ({ handler }: { handler: () => void }) => {
  const dispatch: AppDispatch = useDispatch();
  const [isAuth] = useIsAuth();

  const handleShowModal = () => {
    dispatch(showModal({ modalType: "reg" }));
    handler();
  };

  if(isAuth) return null;

  return (
    <div className={style.navBtns}>
      <Button
        cb={handleShowModal}
        isActive={true}
        size={ButtonSize.M}
        theme={ButtonTheme.DARK}
        title="Зарегистрироваться"
        animation="animate__animated animate__backInRight"
      />
    </div>
  );
};
