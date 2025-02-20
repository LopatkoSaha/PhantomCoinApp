import { useDispatch } from "react-redux";

import style from "./Personal.module.scss";
import { RootState } from "app/store/store";
import { useAppSelector } from "app/store/useAppSelector";
import { AppDispatch } from "app/store/store";
import { showModal } from "app/store/slices/modalSlice";
import { Wallet } from "shared/components/Wallet/Wallet";
import { BuyCurrency } from "shared/components/BuyCurrency/BuyCurrency";
import { Preorder } from "shared/components/Preorder/Preorder";
import { PreorderStore } from "shared/components/PreorderStore/PreorderStore";

interface User {
  id: number;
  name: string;
  email?: string;
  walletId: number;
}

export const PersonalPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useAppSelector((state: RootState) => state.user);

  const isUser = Boolean(user?.name);

  return <>
    {isUser &&
      <div className={style.wrapperPersonal}>
        <div className={style.headerPersonal}>Личный кабинет пользователя {user.name}</div>
        <div className={style.containerPersonal}>
          <div className={style.containerWallet}>
            <div className={style.wallet}>
              <Wallet />
            </div>
            <div className={style.buy}>
              <BuyCurrency />
            </div>
          </div>
          <div className={style.containerFeedback}>
            <div className={style.preorder}>
              <Preorder />
            </div>
            <div className={style.preorderStore}>
              <PreorderStore />
            </div>
          </div>
        </div>
      </div>
    }
  </>;
};
