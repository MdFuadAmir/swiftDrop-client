import { FaBoxOpen, FaBiking, FaMapMarkedAlt, FaCheckCircle } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    { id: 1, title: "Book Delivery", desc: "Enter pickup & drop details easily.", icon: <FaBoxOpen className="text-indigo-600 text-5xl mb-4" /> },
    { id: 2, title: "We Pick It Up", desc: "Our rider collects your parcel safely.", icon: <FaBiking className="text-indigo-600 text-5xl mb-4" /> },
    { id: 3, title: "In Transit", desc: "Track your parcel in real time.", icon: <FaMapMarkedAlt className="text-indigo-600 text-5xl mb-4" /> },
    { id: 4, title: "Delivered!", desc: "We deliver on time, every time.", icon: <FaCheckCircle className="text-indigo-600 text-5xl mb-4" /> },
  ];

  return (
    <section className="py-12 text-center px-4">
      <h2 className="text-3xl font-bold text-indigo-900 mb-4">How It Works</h2>
      <p className="text-gray-500 mb-8">4 Simple Steps to Deliver Anything, Anywhere</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mx-auto">
        {steps.map((step) => (
          <div key={step.id} className="p-6 flex flex-col items-center  rounded-xl shadow hover:shadow-lg transition bg-linear-to-br from-gray-300 to-gray-50">
            {step.icon}
            <h3 className="text-lg font-semibold text-indigo-900">{step.title}</h3>
            <p className="text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
