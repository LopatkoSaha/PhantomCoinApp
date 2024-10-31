import { useEffect } from "react";
import { useDispatch } from "react-redux";

import style from "./AllUsers.module.scss";
import { useAppSelector } from "app/store/useAppSelector";
import { getAllUsers } from "api/apiFetch/fetchUsers";
import { AppDispatch } from "app/store/store";
import { usersWordEnding } from "shared/hendlers/wordEnding";
import { Button, ButtonSize, ButtonTheme } from "shared/elements/Button/Button";
import { deleteUser } from "api/apiFetch/fetchUsers";

export const AllUsers = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    getAllUsers(dispatch);
  }, []);

  const registeredUsers = useAppSelector((state) => state.allUsers);
  const quantityUsers = registeredUsers.length;

  const deleteHandler = (user: Record<string, string>) => {
    deleteUser(dispatch, user);
  };

  return (
    <>
      {!quantityUsers ? (
        <div className={style.wrapper}>
          <div className={style.header}>
            Зарегистрированных пользователей пока нет
          </div>
        </div>
      ) : (
        <div className={style.wrapper}>
          <div className={style.header}>
            С нами {quantityUsers === 1 ? "сотрудничает" : "сотрудничают"}{" "}
            {usersWordEnding(quantityUsers)}
          </div>
          <div className={style.container}>
            {registeredUsers.map((item: Record<string, string>, id) => {
              return (
                <div key={id} className={style.card}>
                  <div className={style.textContent}>
                    {id + 1}. {item.name} ______ {item.email}
                  </div>
                  <div className={style.btn}>
                    <Button
                      cb={() =>
                        deleteHandler({ name: item.name, email: item.email })
                      }
                      isActive={true}
                      size={ButtonSize.M}
                      theme={ButtonTheme.LIGTH}
                      title="Удалить"
                      animation="animate__animated animate__bounce"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
