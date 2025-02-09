import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { routeConfig } from "shared/config/routeConfig/routeConfig";
import { PageLoader } from "shared/elements/PageLoader/PageLoader";

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {Object.values(routeConfig).map(({ element, path }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<PageLoader />}>
                <div className="page-wrapper">{element}</div>
              </Suspense>
            }
          />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
