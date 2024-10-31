import { useDispatch } from "react-redux";

import style from "./Personal.module.scss";
import { useAppSelector } from "app/store/useAppSelector";
import { AppDispatch } from "app/store/store";
import { showModal } from "app/store/slices/modalSlice";
import { NotFoundPage } from "pages/NotFoundPage/index";

export const PersonalPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentUser = useAppSelector((state) => state.user);

  const isUser = Object.keys(currentUser).length > 0;

  !isUser && dispatch(showModal({ modalType: "log" }));

  return <>{!isUser && <NotFoundPage />}</>;
};
