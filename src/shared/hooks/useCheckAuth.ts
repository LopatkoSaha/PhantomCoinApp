import { useNavigate } from "react-router-dom";
import { useAppSelector } from "app/store/useAppSelector";
import { RoutePath, AppRoutes } from "shared/config/routeConfig/routeConfig";


export const useCheckAuth = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user);
    if(!user) {
      navigate(RoutePath[AppRoutes.MAIN]);
    }
};

export const useIsAuth = () => {
  const user = useAppSelector((state) => state.user);
  return [!!user];
};
