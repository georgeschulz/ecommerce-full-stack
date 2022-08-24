import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../features/auth";

function RestrictedRoutes() {
    const isAuth = useSelector(selectIsAuth);;
    return <> {!isAuth ? <Outlet /> : <Navigate to='/settings' />}</>
}

export default RestrictedRoutes;