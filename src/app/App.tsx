import { Suspense } from "react";

import "./styles/index.scss";
import { AppRouter } from "./provider/router";
import { Navbar } from "./layout/Navbar";
import { Message } from "shared/elements/Message/Message";
import { Modal } from "shared/elements/Modal/Modal";
import { ChargeOfCourse } from "shared/components/ChargeOfCourse";

const App = () => {
  return (
    <div className="app">
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <AppRouter />
        </div>
        <Modal />
        <Message />
      </Suspense>
      <ChargeOfCourse />
    </div>
  );
};

export default App;
