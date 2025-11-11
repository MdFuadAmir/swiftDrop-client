import { FaRegNewspaper } from "react-icons/fa6";
import news1 from "../../../assets/allImages/news1.png"
import news2 from "../../../assets/allImages/news2.png"
import news3 from "../../../assets/allImages/news3.jpg"
const BlogSection = () => {
  const posts = [
    {
      title: "5 Tips for Safe Parcel Packaging",
      subTitle:`Learn how to pack your parcels the right way to prevent damage during delivery.
Simple steps to keep your items safe from pickup to doorstep.`,
      date: "Nov 1, 2025",
      img: news1,
    },
    {
      title: "Why Swift Delivery Matters",
      subTitle:`Speed isn’t just convenience — it builds customer trust and satisfaction.
Discover how timely delivery can grow your business and reputation.`,
      date: "Oct 20, 2025",
      img: news2,
    },
    {
      title: "Eco-Friendly Courier Practices",
      subTitle:`Go green with smarter delivery methods that reduce waste and emissions.
See how small changes in packaging and routes make a big impact.`,
      date: "Sep 15, 2025",
      img: news3,
    },
  ];

  return (
    <section className="py-12 text-center px-4">
      <h2 className="text-3xl font-bold text-indigo-900 mb-8 flex justify-center items-center gap-2">
        <FaRegNewspaper className="text-indigo-600" /> Latest News
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
        {posts.map((p, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden"
          >
            <img
              src={p.img}
              alt={p.title}
              className="h-52 w-full object-cover"
            />
            <div className="p-5 text-left">
              <p className="text-sm text-gray-400 mb-1">{p.date}</p>
              <h3 className="font-semibold text-xl text-indigo-900">
                {p.title}
              </h3>
              <p className="text-sm text-gray-600">{p.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
