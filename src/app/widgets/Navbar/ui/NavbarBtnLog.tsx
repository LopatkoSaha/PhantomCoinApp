import { useDispatch } from "react-redux";

import style from "./Navbar.module.scss";
import { Button, ButtonSize, ButtonTheme } from "shared/ui/Button/Button";
import { AppDispatch } from "app/store/store";
import { showModal } from "app/store/slices/modalSlice";

export const NavbarBtnLog = ({handler}: {handler: () => void}) => {
  const dispatch: AppDispatch = useDispatch();

  const handleShowModal = () => {
    dispatch(showModal({ modalType: "log" }));
    handler();
  };

  return (
    <div className={style.navBtns}>
      <Button
        cb={handleShowModal}
        isActive={true}
        size={ButtonSize.M}
        theme={ButtonTheme.LIGTH}
        title="Войти"
        animation="animate__animated animate__backInRight"
      />
    </div>
  );
};
