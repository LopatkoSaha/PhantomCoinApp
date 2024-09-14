import style from "./Message.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "app/store/store";
import { setShowMessage } from "app/store/slices/messageSlice";
import { useAppSelector } from "app/store/useAppSelector";

export const Message = () => {
  const dispatch: AppDispatch = useDispatch();
  const { showMessage, msgText, msgType } = useAppSelector(
    (state) => state.message
  );

  const handleClose = () => {
    dispatch(setShowMessage(false));
  };

  return (
    <>
      {showMessage && (
        <div
          className={`${style.Wrapper}  animate__animated animate__backInDown`}
        >
          <div
            className={`${style.Content} ${style[msgType]}`}
            key={msgType}
          >
            {msgText}
            <button className={style.btn} onClick={handleClose}>
              Ok
            </button>
          </div>
        </div>
      )}
    </>
  );
};
