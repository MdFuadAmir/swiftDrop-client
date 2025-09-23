import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key);
const Payment = () => {
  return (
    <div className="my-12">
      <h1 className="text-2xl font-bold font-serif text-center underline mb-6">
        Payment Method
      </h1>
      <Elements stripe={stripePromise}>
        <PaymentForm></PaymentForm>
      </Elements>
    </div>
  );
};

export default Payment;
