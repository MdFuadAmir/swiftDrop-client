import Banner from "../Banner/Banner";
import BlogSection from "../BlogSection/BlogSection";
import ContactSection from "../ContactSection/ContactSection";
import HowItWorks from "../HowItWorks/HowItWorks";
import Services from "../Services/Services";
import Statisticss from "../Statisticss/Statisticss";
import Testimonials from "../Testimonials/Testimonials";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services />
            <HowItWorks/>
            <WhyChooseUs/>
            <BlogSection/>
            <Statisticss/>
            <Testimonials/>
            <ContactSection/>
        </div>
    );
};

export default Home; 