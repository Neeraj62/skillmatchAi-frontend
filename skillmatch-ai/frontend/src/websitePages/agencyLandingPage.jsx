import React from "react";
import AgencyNavbar from "../agencyComponents/navbar";
import AgencyHero from "../agencyComponents/hero";
import AgencyAbout from "../agencyComponents/about";
import AgencyServices from "../agencyComponents/services";
import WhyChooseUs from "../agencyComponents/whyChooseUs";
import OurProcess from "../agencyComponents/process";
import AgencyTeam from "../agencyComponents/team";
import AgencyContact from "../agencyComponents/contact";
import Footer from "../websiteComponents/footer";

const AgencyLandingPage = () => {
  return (
    <div style={{ backgroundColor: "#0f172a", scrollBehavior: "smooth" }}>
      <AgencyNavbar />
      <AgencyHero />
      <AgencyAbout />
      <AgencyServices />
      <WhyChooseUs />
      <OurProcess />
      <AgencyTeam />
      <AgencyContact />
      <Footer />
    </div>
  );
};

export default AgencyLandingPage;
