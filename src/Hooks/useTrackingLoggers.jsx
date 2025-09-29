import useAxiosSecure from "./useAxiosSecure";


const useTrackingLoggers = () => {
    const axiosSecure = useAxiosSecure();
    const logTracking = async({trackingId,status,details,location,updated_by})=>{
        try{
            const payLoad = {
                trackingId,
                status,
                details,
                location,
                updated_by,
            };
            await axiosSecure.post('/trackings', payLoad);
        }catch(error){
            console.log(error);
        }
    }
    return {logTracking}
};

export default useTrackingLoggers;