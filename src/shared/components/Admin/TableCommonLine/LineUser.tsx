
import style from "./TableCommonLine.module.scss";

export function LineUser({itemData , activateHandler }: {itemData: any, activateHandler: any}) {
    return (
      <div className={style.card}>
        <div className={style.cell}>{itemData.id}</div>
        <div className={style.cell}>{itemData.name}</div>
        <div className={style.cell}>{itemData.email}</div>
        <div className={style.cell}>{new Date(itemData.created_at).toLocaleDateString('ru-RU')}</div>
        <div className={style.cell}>{itemData.walletId}</div>
        <div className={style.cell}>{itemData.telegram_id || "null"}</div>
        <div className={style.cell}>{itemData.is_active}</div>
        <button className={style.cell} onClick={() => activateHandler(itemData.id, itemData.is_active)}>{itemData.is_active ? "Деактивировать" : "Активировать"}</button>
      </div>
    );
  }