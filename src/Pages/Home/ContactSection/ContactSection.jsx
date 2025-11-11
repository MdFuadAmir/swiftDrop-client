import { FaEnvelope, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";


const ContactSection = () => {
  return (
    <section className="py-12 mb-12 rounded-xl bg-linear-to-b from-gray-900 to-gray-600 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 p-6">
        <div>
          <h2 className="text-3xl font-bold text-amber-400 mb-4">Get in Touch</h2>
          <p className="text-gray-300 mb-6">
            Need help or have a question? Our support team is here 24/7.
          </p>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-amber-400" /> mdfuadamir@gmail.com
            </li>
            <li className="flex items-center gap-3">
              <FaPhone className="text-amber-400" /> +880 1705470131
            </li>
            <li className="flex items-center gap-3">
              <FaLocationDot className="text-amber-400" /> Kushtia, Bangladesh
            </li>
          </ul>
        </div>
        <div className="bg-linear-to-b from-gray-500  to-gray-300 rounded-xl p-6 text-black shadow-lg">
          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full border border-gray-700 rounded-lg p-3" />
            <input type="email" placeholder="Your Email" className="w-full border border-gray-700 rounded-lg p-3" />
            <textarea rows="4" placeholder="Your Message" className="w-full border border-gray-700 rounded-lg p-3"></textarea>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
