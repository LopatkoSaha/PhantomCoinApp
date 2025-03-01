
import { useState } from "react";

import style from "./Telegram.module.scss";
import { telegramQRGet } from "api/axios/telegramQRGet";

export const Telegram = () => {

    const [qr, setQr] = useState('');

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.header}>Взаимодействовать с телеграм</div>
                <div className={style.content}>
                    {qr 
                        ? <img src={qr} alt={"QRcode"} /> 
                        : <div>Нажмите кнопку cгенерировать QR код</div>
                    }
                </div>
                <button 
                    className={style.btnQR}
                    onClick={() => telegramQRGet().then((data) => setQr(data))}
                >
                    {qr ? "Обновить QR код" : "Сгенерировать QR код"}
                </button>
            </div>
        </div>
    )
}