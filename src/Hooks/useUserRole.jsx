import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";



const useUserRole = () => {
    const {user,loading:roleLoading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {data: role='user',refetch} = useQuery({
        queryKey:['userRole',user?.email],
        enabled:!roleLoading && !!user?.email,
        queryFn:async()=>{
            const res = await axiosSecure.get(`/users/${user?.email}/role`);
            return res.data.role;
        }
    }) 
    return {role,roleLoading,refetch};

    
};

export default useUserRole;