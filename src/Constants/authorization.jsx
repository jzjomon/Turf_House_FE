const { Outlet, Navigate } = require("react-router-dom");

export const Authorization = () => {
    const token = localStorage.getItem("token");
    return (token ? <Outlet/> : (localStorage.clear(),<Navigate to="/" />))
};

export const LoginOrHome = () => {
    const token = localStorage.getItem("token");
    return (token ? <Navigate to="Home" /> : <Outlet />)
}