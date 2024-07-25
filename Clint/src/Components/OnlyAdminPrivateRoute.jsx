import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const OnlyAdminPrivateRoute = () => {
    const { userInfo } = useSelector((state) => state.auth)
    return userInfo && userInfo.IsAdmin ? <Outlet /> : <Navigate to={"/sign-in"} />
}

export default OnlyAdminPrivateRoute