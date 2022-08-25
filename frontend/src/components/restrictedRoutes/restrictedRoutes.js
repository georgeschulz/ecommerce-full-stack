import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../features/auth";
import { selectIsWarrantyFlow } from "../../features/wizardSlice";

function RestrictedRoutes() {
    const isAuth = useSelector(selectIsAuth);
    const isWarrantyFlow = useSelector(selectIsWarrantyFlow);
    const redirectType = isWarrantyFlow ? '/wizard/2' : '/';

    return <> {!isAuth ? <Outlet /> : <Navigate to={redirectType} />}</>
}

export default RestrictedRoutes;