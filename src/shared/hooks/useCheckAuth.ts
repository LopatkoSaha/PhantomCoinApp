import { useNavigate } from "react-router-dom";
import { useAppSelector } from "app/store/useAppSelector";
import { RoutePath, AppRoutes } from "shared/config/routeConfig/routeConfig";


export const useCheckAuth = () => {
    const navigate = useNavigate();
    const {id} = useAppSelector((state) => state.user);
    if(!id) {
      navigate(RoutePath[AppRoutes.MAIN]);
    }
};

export const useIsAuth = () => {
  const {id} = useAppSelector((state) => state.user);
  return [!!id];
};