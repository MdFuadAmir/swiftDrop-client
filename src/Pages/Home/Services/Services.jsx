import { FaClock, FaTruck, FaStore } from "react-icons/fa6";
import image1 from "../../../assets/allImages/same.jpg"
import image2 from "../../../assets/allImages/next.jpeg"
import image3 from "../../../assets/allImages/function.jpg"

const Services = () => {
  const services = [
    {
      icon: <FaClock className="text-indigo-600 text-4xl mb-3" />,
      title: "Same-Day Delivery",
      desc: "Quick service for urgent parcels.",
      img: image1,
    },
    {
      icon: <FaTruck className="text-indigo-600 text-4xl mb-3" />,
      title: "Next-Day Delivery",
      desc: "Perfect for planned shipments.",
      img: image2,
    },
    {
      icon: <FaStore className="text-indigo-600 text-4xl mb-3" />,
      title: "E-commerce Fulfillment",
      desc: "Bulk deliveries for online stores.",
      img: image3,
    },
  ];

  return (
    <section className="py-12 text-center px-4">
      <h2 className="text-3xl font-bold text-indigo-900 mb-8">
        Our Delivery Services
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8  mx-auto">
        {services.map((s, i) => (
          <div
            key={i}
            className="bg-linear-to-r from-gray-200 to-gray-50  rounded-xl shadow hover:shadow-xl transition overflow-hidden"
          >
            <img
              src={s.img}
              alt={s.title}
              className="h-56 w-full object-cover"
            />
            <div className="p-5 flex flex-col items-center">
              {s.icon}
              <h3 className="font-semibold text-xl text-indigo-900">
                {s.title}
              </h3>
              <p className="text-gray-600 mt-2">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
