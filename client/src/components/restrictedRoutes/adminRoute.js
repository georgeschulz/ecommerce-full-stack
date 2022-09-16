import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../features/auth";
import { selectIsAdmin } from "../../features/auth";

function AdminRoutes() {
    const isAuth = useSelector(selectIsAuth);
    const isAdmin = useSelector(selectIsAdmin)

    return <> {isAuth && isAdmin ? <Outlet /> : <Navigate to='/' />}</>
}

export default AdminRoutes;