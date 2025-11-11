import { FaStar } from "react-icons/fa";


const Testimonials = () => {
  const feedbacks = [
    { name: "Ayesha Rahman", text: "Super fast delivery! My parcel arrived within hours.", rating: 5 },
    { name: "Tariq Hasan", text: "Affordable and reliable. Will use again.", rating: 4 },
    { name: "Rafiq Hossain", text: "Excellent support team and secure handling!", rating: 5 },
  ];

  return (
    <section className="py-12 px-4 text-center">
      <h2 className="text-3xl font-bold mb-3 text-amber-400">What Our Customers Say</h2>
      <p className="text-gray-600 mb-10">Thousands of happy clients trust SwiftDrop</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8  mx-auto">
        {feedbacks.map((fb, i) => (
          <div key={i} className="bg-linear-to-bl from-gray-400 to-gray-200 p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="flex justify-center mb-3 text-yellow-400">
              {Array.from({ length: fb.rating }).map((_, idx) => (
                <FaStar key={idx} />
              ))}
            </div>
            <p className="italic mb-3">"{fb.text}"</p>
            <p className="font-bold">— {fb.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

