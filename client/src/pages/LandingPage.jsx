import AnimatedDock from "@/components/animata/container/AnimatedDock";
import React from "react";
import About from "./About";
import Contact from "./Contact";
import Home from "./Home";

const LandingPage = () => {
  const HomeImg = <img src={"/Home.svg"} />;
  const AboutImg = <img src={"/About.svg"} />;
  const ContactImg = <img src={"/Contact.svg"} />;

  const dockItems = [
    {
      title: "Home",
      icon: HomeImg,
      to: "#home",
    },
    {
      title: "About",
      icon: AboutImg,
      to: "#about",
    },
    {
      title: "Contact",
      icon: ContactImg,
      to: "#contact",
    },
  ];

  return (
    <div className="h-screen overflow-y-scroll">
      {/* Mobile-responsive navigation dock */}
      <div className="fixed bottom-4 md:bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <AnimatedDock
          items={dockItems}
          largeClassName="bg-black/80 backdrop-blur-lg gap-6 px-6 py-3 rounded-full border border-white/20"
          smallClassName="bg-black/80 backdrop-blur-lg gap-3 px-4 py-3 rounded-full border border-white/20"
        />
      </div>
      
      {/* Home Section */}
      <section id="home" className="min-h-screen flex items-center justify-center">
        <Home />
      </section>
      
      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center">
        <About />
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center">
        <Contact />
      </section>
      {/* <h1>LandingPage</h1>
          <button onClick={changeRoom}>Join-Room</button> */}
    </div>
  );
};

export default LandingPage;
