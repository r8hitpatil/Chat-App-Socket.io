import AnimatedDock from "@/components/animata/container/AnimatedDock";
import React from "react";
import About from "./About";
import Contact from "./Contact";
import Home from "./Home";

const LandingPage = () => {
  const HomeImg = <img src={"src/assets/Home.svg"} />;
  const AboutImg = <img src={"src/assets/About.svg"} />;
  const ContactImg = <img src={"src/assets/Contact.svg"} />;

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
    }
  ];

  return (
    <div className="h-screen overflow-y-scroll ">
      <div className="fixed bottom-10 flex w-full items-center justify-center z-10">
        <AnimatedDock
          items={dockItems}
          largeClassName="mt-10 bg-black gap-7"
          smallClassName="fixed left-1/2 -translate-x-1/2 gap-7"
        />
      </div>
      <section id="home" className="h-screen flex items-center justify-center">
        <Home />
      </section>
      <section id="about" className="h-screen flex items-center justify-center">
        <About />
      </section>
      <section
        id="contact"
        className="h-screen flex items-center justify-center"
      >
        <Contact />
      </section>
      {/* <h1>LandingPage</h1>
          <button onClick={changeRoom}>Join-Room</button> */}
    </div>
  );
};

export default LandingPage;
