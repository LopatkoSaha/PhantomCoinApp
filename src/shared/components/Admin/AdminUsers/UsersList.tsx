import { useState, useEffect, useMemo } from "react";

import { TableCommon } from "../TableCommonLine/TableCommon";
import { LineUser } from "../TableCommonLine/LineUser";
import { allUsersGet, activationUserPost, deactivationUserPost } from "api/axios/adminRestApi/users";
  
export type TUser = {
  id: number;
  name: string;
  is_active: 0 | 1;
  email: string;
  created_at: string;
  walletId: number;
  telegram_id: number;
};

const matcher = {
  id: {
    title: "Id",
    isSort: true,
  },
  name: {
    title: "Имя",
    isSort: true,
  },
  email: {
    title: "Почта",
    isSort: true,
  },
  created_at: {
    title: "Дата",
    isSort: true,
  },
  walletId: {
    title: "Кошелек",
    isSort: false,
  },
  telegram_id: {
    title: "Телеграмм",
    isSort: false,
  },
  is_active: {
    title: "Активность",
    isSort: false,
  },
}
  
export function UsersList() {

  const [users, setUsers] = useState<TUser[] | null>(null);

  const fetchUsers = async () => {
    try {
      const data = await allUsersGet();
      setUsers(data);
    } catch (error) {
      console.error("Ошибка при получении информации о кошельках:", error);
    }
  };
      
  useEffect(() => { 
    fetchUsers();
  },[]);

  const mappedUsers = useMemo(() => {
    if(!users) return [];
    const usersList: TUser[] = users.map((item) => {
      return {
        id: item.id,
        name: item.name,
        email: item.email,
        created_at: item.created_at,
        walletId: item.walletId,
        telegram_id: item.telegram_id,
        is_active: item.is_active,
      }
    });

    return usersList;
  },[users]);

  async function activateHandler (userId: number, is_active: number) {
    if(is_active) await deactivationUserPost(userId);
    if(!is_active) await activationUserPost(userId);
    await fetchUsers();
  };

  function renderLine (dataItem: TUser) {
    return <LineUser itemData={dataItem} activateHandler={activateHandler} />;
  };

  return mappedUsers && <TableCommon data={mappedUsers} matcher={matcher} renderLine={renderLine} />
};