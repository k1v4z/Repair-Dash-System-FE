import Hero from "./_components/hero-section";
import Services from "./_components/services";
// import StoreCarousel from "./_components/store-carousel";
import Feedback from "./_components/feedback";
import CallToAction from "./_components/call-to-action";

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      {/* <StoreCarousel /> */}
      <Feedback />
      <CallToAction />
    </>
  );
};

export default Home;
