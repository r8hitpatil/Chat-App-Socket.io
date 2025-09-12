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
      <div className="fixed bottom-4 md:bottom-10 flex w-full items-center justify-center z-10 px-4">
        <AnimatedDock
          items={dockItems}
          largeClassName="mt-10 bg-black gap-4 md:gap-7 px-4 py-2 rounded-full"
          smallClassName="fixed left-1/2 -translate-x-1/2 gap-4 md:gap-7 px-4 py-2 rounded-full bg-black"
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
