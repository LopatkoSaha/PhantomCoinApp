import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import style from "./Message.module.scss";
import { useAppSelector } from "app/store/useAppSelector";
import { AppDispatch } from "app/store/store";
import { showMessage } from "app/store/slices/messageSlice";

const timout: { [key: string]: number } = {
  info: 3000,
  success: 0,
  warning: 10000,
  error: 0,
};

export const Message = () => {
  const message = useAppSelector((state) => state.message);
  const { msgText, msgType } = message;

  const dispatch: AppDispatch = useDispatch();

  const [lineMessage, setLineMessage] = useState<any[]>([]);
  let timeoutId: NodeJS.Timeout | null = null;

  useEffect(() => {
    setLineMessage((prev) => {
      if (!msgText) return prev;
      const id = Date.now();

      if (timout[msgType] !== 0) {
        timeoutId = setTimeout(() => {
          handleClose(id);
        }, timout[msgType]);
      }

      return [...prev, { msgText, msgType, id }];
    });
  }, [message]);

  const handleClose = (id: number) => {
    if (timeoutId) {
      const messageToClose = lineMessage.find((item) => item.id === id);
      if (messageToClose) {
        clearTimeout(messageToClose.timeoutId);
      }
    }
    setLineMessage((prev) => prev.filter((item) => item.id !== id));
    if (lineMessage.length === 1)
      dispatch(showMessage({ msgText: "", msgType: "info" }));
  };

  if (lineMessage.length < 1) return null;

  return (
    <div className={style.Wrapper}>
      {lineMessage.map((item) => {
        return (
          <div
            key={item.id}
            className={`${style.Content} ${
              style[item.msgType]
            } animate__animated animate__backInDown`}
          >
            {item.msgText}
            <button className={style.btn} onClick={() => handleClose(item.id)}>
              Ok
            </button>
          </div>
        );
      })}
    </div>
  );
};
