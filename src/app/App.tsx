import "./styles/index.scss";

import { Suspense } from "react";
import { AppRouter } from "./provider/router";
import { Navbar } from "./widgets/Navbar";
import { Sidebar } from "./widgets/Sidebar";

const App = () => {
  return (
    <div className="app">
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default App;
