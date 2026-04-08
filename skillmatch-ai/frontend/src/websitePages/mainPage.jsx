import React from "react";
import Navbar from "../websiteComponents/navbar";
import Hero from "../websiteComponents/hero";
import About from "../websiteComponents/about";
import Feature from "../websiteComponents/feature";
import Team from "../websiteComponents/team";
import Testimonials from "../websiteComponents/testimonial";
import FAQ from "../websiteComponents/faq";
import Footer from "../websiteComponents/footer";
import GallaryComponent from "../websiteComponents/gallary";

const MainPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Feature />
      <Team />
      <GallaryComponent />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
};

export default MainPage;
