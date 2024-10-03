import { Portal } from "shared/elements/Portal/Portal";
import style from "./ModaPortal.module.scss";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const ModalPortal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className={style.ModalOverlay} onClick={onClose}>
        <div
          className={`${style.ModalContent} animate__animated animate__backInDown`}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={style.CloseButton} onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    </Portal>
  );
};
