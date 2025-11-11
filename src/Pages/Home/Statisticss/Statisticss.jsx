import { FaBox, FaChartLine, FaSmile, FaUsers } from "react-icons/fa";

const Statisticss = () => {
  const stats = [
    {
      icon: <FaBox className="text-4xl text-amber-400 mb-2" />,
      number: "25K+",
      label: "Parcels Delivered",
    },
    {
      icon: <FaUsers className="text-4xl text-amber-400 mb-2" />,
      number: "500+",
      label: "Active Riders",
    },
    {
      icon: <FaChartLine className="text-4xl text-amber-400 mb-2" />,
      number: "99%",
      label: "Delivery Success Rate",
    },
    {
      icon: <FaSmile className="text-4xl text-amber-400 mb-2" />,
      number: "4.9⭐",
      label: "Customer Rating",
    },
  ];

  return (
    <section className="py-12 px-4 text-center">
      <div className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div
            key={i}
            className="p-6 rounded-xl backdrop-blur-sm shadow-md bg-linear-to-br from-gray-500 to-gray-300"
          >
            {s.icon}
            <h3 className="text-3xl font-bold text-amber-400">{s.number}</h3>
            <p className="text-white">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statisticss;
