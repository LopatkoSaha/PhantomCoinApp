import style from "./AboutPage.module.scss";
import { AllUsers } from "shared/elements/AllUsers/AllUsers";

const AboutPage = () => {
  return (
    <>
      <div
        className={`${style.AboutWrapper} animate__animated animate__backInUp`}
      >
        <AllUsers />
      </div>
    </>
  );
};

export default AboutPage;
