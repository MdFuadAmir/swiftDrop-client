import { Navigate, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";
import useUserRole from "../Hooks/useUserRole";


const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const {role,roleLoading} = useUserRole();
    const location = useLocation();

    if(loading || roleLoading){
        return <span className="loading loading-bars loading-xl"></span>
    }
    if(!user || role !== "admin"){
        return <Navigate state={{from: location?.pathname}} to='/forbidden' replace></Navigate>
    }
    return children;
};


export default AdminRoute;