import { useDispatch } from "react-redux";

import style from "./Navbar.module.scss";
import { Button, ButtonSize, ButtonTheme } from "shared/elements/Button/Button";
import { AppDispatch } from "app/store/store";
import { showModal } from "app/store/slices/modalSlice";

export const NavbarBtnReg = ({ handler }: { handler: () => void }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleShowModal = () => {
    dispatch(showModal({ modalType: "reg" }));
    handler();
  };

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
