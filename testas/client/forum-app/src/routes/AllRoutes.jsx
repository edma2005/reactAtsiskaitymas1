import { Route, Routes as RoutesWrapper } from "react-router-dom";
import { authLayoutRoutes, mainLayoutRoutes } from "./consts";

import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

const AllRoutes = () => {
  const { isLoggedIn } = useContext(UserContext);
  const { Layout, routes } = isLoggedIn ? mainLayoutRoutes : authLayoutRoutes;
  return (
    <RoutesWrapper>
      {routes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Layout>
                <Component />
            </Layout>
          }
        />
      ))}
    </RoutesWrapper>
  );
};

export default AllRoutes;