
import style from "./TableCommonLine.module.scss";

export function LineWallet({itemData , showModalHandler }: {itemData: any, showModalHandler: any}) {
    return (
      <div className={style.card}>
        <div className={style.cell}>{itemData.id}</div>
        <div className={style.cell}>{itemData.name}</div>
        <div className={style.cell}>{itemData.email}</div>
        <div className={style.cell}>{new Date(itemData.created_at).toLocaleDateString('ru-RU')}</div>
        <div className={style.cell}>{itemData.totalCostUsd}</div>
        <button className={style.cell} onClick={() => showModalHandler(itemData.id)}>Редактировать</button>
      </div>
    );
  }