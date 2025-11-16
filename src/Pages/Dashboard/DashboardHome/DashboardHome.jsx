import Loading from "../../../Components/Loading/Loading";
import useUserRole from "../../../Hooks/useUserRole";
import Forbidden from "../../Forbidden/Forbidden";
import AdminDashboard from "./AdminDashboard";
import RiderDashboard from "./RiderDashboard";
import UserDashboard from "./UserDashboard";


const DashboardHome = () => {
    const {role, roleLoading} = useUserRole();
    if(roleLoading){
        return <Loading/>;
    }
    if(role === 'user'){
        return <UserDashboard></UserDashboard>
    }
    else if(role === 'rider'){
        return <RiderDashboard></RiderDashboard>
    }
    else if(role === 'admin'){
        return <AdminDashboard></AdminDashboard>
    }
    else{
        return <Forbidden></Forbidden>
    }

};

export default DashboardHome;