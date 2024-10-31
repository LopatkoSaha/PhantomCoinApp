import style from "./MainPage.module.scss";
import { promoText } from "shared/assets/texts/promoText";

const MainPage = () => {
  return (
    <div className={`${style.wrapperMain} animate__animated animate__backInUp`}>
      {/* <div className={style.bgVideo}>
        <video autoPlay muted loop>
          <source src={"/videos/space.mp4"} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div> */}
      <div className={style.textContainer}>{promoText}</div>
    </div>
  );
};

export default MainPage;
