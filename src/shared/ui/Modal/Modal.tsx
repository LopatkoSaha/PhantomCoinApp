import { useDispatch } from "react-redux";

import style from "./Modal.module.scss";
import { LogForm } from "shared/ui/Forms/LogForm/LogForm";
import { RegForm } from "shared/ui/Forms/RegForm/RegForm";
import { AppDispatch } from "app/store/store";
import { showModal } from "app/store/slices/modalSlice";
import { useAppSelector } from "app/store/useAppSelector";

export const Modal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { modalType } = useAppSelector((state) => state.modal);

  const handleClose = () => {
    dispatch(showModal({ modalType: "" }));
  };

  if (!modalType) return null;

  return (
    <div className={style.ModalOverlay}>
      <div
        className={`${style.ModalContent} animate__animated animate__backInDown`}
      >
        {modalType === "log" && <LogForm onClose={handleClose} />}
        {modalType === "reg" && <RegForm onClose={handleClose} />}
        <button className={style.CloseButton} onClick={handleClose}>
          x
        </button>
      </div>
    </div>
  );
};
