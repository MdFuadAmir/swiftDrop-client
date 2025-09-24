import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";


const axiosSecure = axios.create({
  baseURL: `http://localhost:3000`,
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
    const {user,logOut} = useAuth();

    axiosSecure.interceptors.request.use((config) =>{
        config.headers.Authorization = `Bearer ${user?.accessToken}`
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(
      (res) =>{
      return res;
    },
    (error) =>{
      const status = error.response.status;
      console.log('inside interseptors',status);
      if(status === 403){
        navigate('/forbidden');
      }else if(status === 401){
        logOut()
        .then(()=>{
          navigate('/login')
        })
        .catch(()=>{})
      }
      return Promise.reject(error);
    })
  
  return axiosSecure;
};

export default useAxiosSecure;

// authorization
