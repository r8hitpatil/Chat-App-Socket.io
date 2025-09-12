import React from "react";
import { CreateRoom } from "@/components/CreateRoom";
import { JoinRoom } from "@/components/JoinRoom";
import { Meteors } from "@/components/magicui/meteors";
import { TypingAnimation } from "@/components/magicui/typing-animation";

const Home = () => {

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Fullscreen meteors background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Meteors number={30} />
      </div>
      <div className="absolute inset-0 z-[5] flex mt-50 justify-center gap-5">
        <TypingAnimation startOnView={true}>CHAT ON</TypingAnimation>
      </div>
      <div className="absolute inset-0 z-[5] flex mt-65 justify-center gap-5">
        <div className="italic text-7xl" style={{ fontFamily: 'Gloock, serif' }}>
          ANONYMOUS
        </div>
      </div>
      {/* Absolutely centered buttons */}
      <div className="absolute inset-0 z-[5] flex items-center justify-center mt-50 gap-5">
        <div><JoinRoom/></div>
        <div><CreateRoom/></div>
      </div>
    </div>
  );
};

export default Home;
