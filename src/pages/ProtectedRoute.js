import LoginPage from "./LoginPage";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const userAuth = useSelector(state => state.userAuth);

    return (
        <>
        {
        userAuth.isLoggedIn 
                ? children
                : <LoginPage/>
        }
        </>
    )
}

export default ProtectedRoute;