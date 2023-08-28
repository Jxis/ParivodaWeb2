import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
    const user = useSelector((state) => state.user.user);

    return (
        user.token ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes;