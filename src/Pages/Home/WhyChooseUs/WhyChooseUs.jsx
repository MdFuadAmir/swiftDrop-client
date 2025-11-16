import { FaBolt, FaHeadset, FaLock, } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";


const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaBolt className="text-5xl text-amber-400 mb-3" />,
      title: "Fast Delivery",
      desc: "Guaranteed on-time delivery to every destination.",
    },
    {
      icon: <FaLock className="text-5xl text-amber-400 mb-3" />,
      title: "Secure Handling",
      desc: "Your parcel is always safe with us.",
    },
    {
      icon: <FaHeadset className="text-5xl text-amber-400 mb-3" />,
      title: "24/7 Support",
      desc: "We’re always here when you need help.",
    },
    {
      icon: <FaLocationDot className="text-5xl text-amber-400 mb-3" />,
      title: "Nationwide Coverage",
      desc: "We deliver across every major city in Bangladesh.",
    },
  ];

  return (
    <section className="py-12 text-center px-4">
      <h2 className="text-3xl font-bold mb-3 text-amber-400">Why Choose Us</h2>
      <p className="text-gray-600 mb-10">
        SwiftDrop ensures speed, security, and satisfaction.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-linear-to-br from-gray-300 to-gray-50 p-6 rounded-xl shadow-lg hover:bg-indigo-800 transition flex flex-col items-center"
          >
            {f.icon}
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
