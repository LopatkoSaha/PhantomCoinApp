import { useDispatch } from "react-redux";

import style from "./Navbar.module.scss";
import { Button, ButtonSize, ButtonTheme } from "shared/elements/Button/Button";
import { AppDispatch } from "app/store/store";
import { showModal } from "app/store/slices/modalSlice";
import { user } from "app/store/slices/userSlice";
import { useAppSelector } from "app/store/useAppSelector";

type logProps = {
  handler: () => void;
};

export const NavbarBtnLog = ({ handler }: logProps) => {
  const dispatch: AppDispatch = useDispatch();
  const currentUser = useAppSelector((state) => state.user);

  const handleShowModal = () => {
    Object.keys(currentUser);
    dispatch(showModal({ modalType: "log" }));
    handler();
  };

  const isUserLoggedIn = Object.keys(currentUser).length > 0;

  return (
    <>
      {!isUserLoggedIn && (
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
      {isUserLoggedIn && (
        <div className={style.navBtns}>
          <Button
            cb={() => dispatch(user({}))}
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
