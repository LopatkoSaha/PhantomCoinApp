import { useState, useEffect } from "react";

import style from "./AdminGames.module.scss";
import { allGamesInfoGet, setGameDiscriptionPost } from "api/axios/adminRestApi/gamesInfo";
import { OneGameInfo } from "./OneGameInfo";

export const AllGamesInfo = () => {
    const [gamesInfo, setGamesInfo] = useState<Record<string, any>[] | null>(null);


    useEffect(() => {
        const fetchInfo = async () => {
            try {
              const data = await allGamesInfoGet();
              setGamesInfo(data);
            } catch (error) {
              console.error("Ошибка при получении данных об играх:", error);
            }
          };
          fetchInfo();
    },[])

    const handleDiscription = async (id: number, name: string, discription: string) => {
      await setGameDiscriptionPost(id, name, discription);
      const newData = await allGamesInfoGet();
      setGamesInfo(newData);
    };

    if(!gamesInfo) return null;

    return (
      <div className={style.gameInfoWrapper}>
        {gamesInfo.map((item, idx) => {
          return <OneGameInfo key={idx + Date.now()} id={item.id} name={item.name} discription={item.discription} handleDiscription={handleDiscription}/>
        })}
      </div>
    )
}