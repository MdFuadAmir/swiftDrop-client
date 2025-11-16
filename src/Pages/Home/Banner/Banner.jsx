import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../../assets/banner/banner1.jpg";
import img2 from "../../../assets/banner/banner2.png";
import img3 from "../../../assets/banner/banner3.jpg";
import img4 from "../../../assets/banner/banner4.jpg";
import { Link } from "react-router";

const banners = [
  {
    id: 1,
    title: "Fast & Reliable Parcel Delivery",
    subtitle: "Send packages across town or country in no time",
    ctaText: "Send a Parcel",
    ctaLink: "/sendParcel",
    image: img1,
  },
  {
    id: 2,
    title: "Track Your Shipment Easily",
    subtitle: "Real-time updates on your parcel's journey",
    ctaText: "Track Now",
    ctaLink: "/dashboard/track",
    image: img2,
  },
  {
    id: 3,
    title: "Flexible Delivery Options",
    subtitle: "Choose same-day, next-day, or scheduled delivery",
    ctaText: "View Services",
    ctaLink: "/",
    image: img3,
  },
  {
    id: 4,
    title: "Trusted by Thousands",
    subtitle: "Safe, insured, and handled with care",
    ctaText: "Get Started",
    ctaLink: "/signUp",
    image: img4,
  },
];

const Banner = () => {
  return (
    <div className="rounded-lg overflow-hidden shadow-2xl mt-6">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        interval={4000}
        transitionTime={1000}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="relative h-[600px] w-full">
            {/* Background image */}
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-[600px] object-cover"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent z-10"></div>
            {/* Text overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center px-6 md:px-16 z-20 text-white max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                {banner.title}
              </h2>
              <p className="text-gray-200 text-sm md:text-lg mb-6">
                {banner.subtitle}
              </p>
              <Link
                to={banner.ctaLink}
                className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition"
              >
                {banner.ctaText}
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
