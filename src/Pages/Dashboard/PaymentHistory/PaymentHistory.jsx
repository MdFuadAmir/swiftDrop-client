import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {isPending,data:payments=[]} = useQuery({
        queryKey:['payments', user.email],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    })
    if(isPending){
        return <span className="loading loading-bars loading-xl"></span>
    }

    return (
          <div className="p-4 bg-gray-100 rounded-xl mt-12">
      <h2 className="text-xl font-bold mb-4 text-center">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-green-500 text-white">
            <tr>
              <th>#</th>
              <th>Parcel ID</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment.transactionId} className="hover:bg-gray-100">
                <td>{index + 1}</td>
                <td>{payment.parcelId}</td>
                <td>{payment.amount}/=</td>
                <td>{payment.transactionId}</td>
                <td>{new Date(payment.paid_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default PaymentHistory;