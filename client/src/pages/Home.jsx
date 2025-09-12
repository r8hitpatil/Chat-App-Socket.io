import React from "react";
import { CreateRoom } from "@/components/CreateRoom";
import { JoinRoom } from "@/components/JoinRoom";
import { Meteors } from "@/components/magicui/meteors";
import { TypingAnimation } from "@/components/magicui/typing-animation";

const Home = () => {

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Fullscreen meteors background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Meteors number={30} />
      </div>
      
      {/* Main content container with responsive spacing */}
      <div className="absolute inset-0 z-[5] flex flex-col items-center justify-center px-4">
        {/* "CHAT ON" text */}
        <div className="mb-4 md:mb-6">
          <TypingAnimation 
            startOnView={true}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-center"
          >
            CHAT ON
          </TypingAnimation>
        </div>
        
        {/* "ANONYMOUS" text */}
        <div className="mb-8 md:mb-12">
          <div className="italic text-3xl md:text-5xl lg:text-7xl text-center" style={{ fontFamily: 'Gloock, serif' }}>
            ANONYMOUS
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full max-w-md justify-center">
          <div className="flex-1 flex justify-center">
            <JoinRoom/>
          </div>
          <div className="flex-1 flex justify-center">
            <CreateRoom/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
