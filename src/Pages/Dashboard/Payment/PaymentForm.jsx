import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useTrackingLoggers from "../../../Hooks/useTrackingLoggers";

const PaymentForm = () => {
  const { user } = useAuth();
  const { parcelId } = useParams();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {logTracking} = useTrackingLoggers();

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });
  if (isPending) {
    return <span className="loading loading-spinner text-error"></span>;
  }

  const amount = parcelInfo.cost;
  const amountInCents = amount * 100;

  // handle submit button start
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log(paymentMethod);
      //step-2:  creat payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        parcelId,
      });
      const clientSecret = res.data.clientSecret;
      const cardElement = elements.getElement(CardElement);
      //step-3: Then modify your confirmCardPayment call:
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });
      if (result.error) {
        console.log(result.error.message);
      } else {
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          //step-4 creat payment history
          const transactionId = result.paymentIntent.id;
          const paymentData = {
            parcelId,
            email: user.email,
            amount,
            transactionId,
            paymentMethod: result.paymentIntent.payment_method_types,
          };
          const paymentRes = await axiosSecure.post("/payments", paymentData);
          if (paymentRes.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Payment Successful",
              html: `
                 <p><b>Parcel:</b> ${transactionId}</p>
                 `,
              showConfirmButton: false,
              timer: 1500,
            });
            await logTracking({
              trackingId: parcelInfo.trackingId,
              status:"Payment Done",
              details:`Paid by ${user.displayName}`,
              updated_by:user.email
            })
            navigate("/dashboard/myParcels");
          }
        }
      }
    }
  };
  // handle submit button end

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className=" space-y-4 bg-white p-6 rounded-xl shadow-xl w-full max-w-4xl mx-auto"
      >
        <CardElement className="p-2 border rounded"></CardElement>
        <button
          type="submit"
          disabled={!stripe}
          className="btn bg-green-500 w-full"
        >
          Pay Now {parcelInfo.cost}/=
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
