import { Suspense } from "react";

import "./styles/index.scss";
import { AppRouter } from "./provider/router";
import { Navbar } from "./widgets/Navbar";
import { Message } from "shared/ui/Message/Message";
import { Modal } from "shared/ui/Modal/Modal";

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
    </div>
  );
};

export default App;
