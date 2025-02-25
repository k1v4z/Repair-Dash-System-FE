import Hero from "@/features/home/components/hero-section";
import Services from "@/features/home/components/services";
import StoreCarousel from "@/features/home/components/store-carousel";
import Feedback from "@/features/home/components/feedback";
import CallToAction from "@/features/home/components/call-to-action";

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <StoreCarousel />
      <Feedback />
      <CallToAction />
    </>
  );
};

export default Home;
