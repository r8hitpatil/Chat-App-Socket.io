import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import React, { useEffect, useState } from "react";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { ShinyButton } from "@/components/magicui/shiny-button";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import ChatMessages from "@/components/ChatMessages";
import VerticalTiles from "@/components/animata/container/VerticalTiles";

const Room = () => {
  const sendImg = (
    <img src={"/Send.svg"} alt="" className="invert" />
  );
  const [sentMessage, setSentMessage] = useState(""); // why not null
  const [socket, setSocket] = useState(null);
  const [rMessages, setRMessages] = useState([]);
  const [notification, setNotification] = useState(null);
  const { roomId } = useParams();

  // const renderMessages = () => {
  //   return rMessages.map((msg, index) => (
  //     <div key={index}>
  //       <p className={msg.type === "sent" ? "bg-red-100" : "bg-blue-100"}>
  //         {msg.text}
  //       </p>
  //     </div>
  //   ));
  // };

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SOCKET_URL || 'https://chat-app-rect.onrender.com', {
      transports: ['websocket', 'polling'],
      path: '/socket.io/'
    }); // Uses environment variable for flexibility

    newSocket.on("connect", () => {
      if (roomId) {
        newSocket.emit("join-room", roomId);
      }
      console.log(
        `Client with ${newSocket.id} connected our server at roomId ${roomId}`
      );
    });

    newSocket.on("message", (msg) => {
      const receivedMsg = {
        ...msg,
        type: msg.type === "notification" ? "notification" : "received",
      };
      console.log("Received msg", receivedMsg);
      
      // Handle notifications separately - show popup
      if (msg.type === "notification") {
        setNotification(msg.text);
        // Clear notification after 3 seconds
        setTimeout(() => setNotification(null), 3000);
      } else {
        // Regular chat messages
        setRMessages((prev) => [...prev, receivedMsg]);
      }
    });

    setSocket(newSocket);

    return () => {
      // why write cleanup ?
      if (roomId) {
        newSocket.emit("leave-room", roomId); // Add this
      }
      newSocket.disconnect();
      console.log("Socket disconnected");
    };
  }, [roomId]);

  const sendinMsg = () => {
    if (!sentMessage.trim()) return; // Don't send empty messages
    
    const messageObject = {
      text: sentMessage.trim(),
      type: "sent",
      timestamp: new Date(),
    };
    if (socket && sentMessage.trim()) {
      console.log(messageObject);
      setRMessages((prev) => [...prev, messageObject]);
      socket.emit("message", sentMessage.trim());
      setSentMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendinMsg();
    }
  };

  return (
    <div className="h-screen overflow-hidden">
      <div className="relative h-full w-full bg-background">
        <div className="absolute inset-0">
          <FlickeringGrid
            className="absolute inset-0 size-full"
            squareSize={3}
            gridGap={20}
            color="#000000"
            maxOpacity={0.15}
            flickerChance={3}
          />
          
          {/* Chat Messages Container - Responsive */}
          <div className="absolute inset-x-4 md:inset-x-8 lg:inset-x-auto lg:left-1/2 lg:transform lg:-translate-x-1/2 top-4 md:top-8 bottom-24 md:bottom-28 z-20 lg:w-[600px]">
            <div className="w-full h-full bg-white/90 backdrop-blur-sm rounded-lg border shadow-xl">
              <ChatMessages messages={rMessages} className="w-full h-full"/>
            </div>
          </div>
          
          {/* Notification Bubble Popup */}
          {notification && (
            <div className="fixed top-16 md:top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce px-4">
              <VerticalTiles>
                <ShimmerButton className="text-sm md:text-base">
                  {notification}
                </ShimmerButton>
              </VerticalTiles>
            </div>
          )}
          
          {/* Input Area - Responsive */}
          <div className="absolute bottom-4 md:bottom-6 left-4 right-4 md:left-8 md:right-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:w-[600px] z-30">
            <div className="relative">
              <ShimmerButton className="absolute inset-0 w-full h-full rounded-xl border-2 shadow-xl pointer-events-none" />
              <div className="relative z-10 flex items-center gap-2 md:gap-3 p-3 md:p-4 pointer-events-auto rounded-xl">
                <input
                  type="text"
                  placeholder="Enter here"
                  value={sentMessage}
                  onChange={(e) => setSentMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 h-10 md:h-12 px-4 rounded-md outline-none border-none text-sm md:text-base bg-white/90 backdrop-blur-sm"
                />
                <ShinyButton
                  className="h-10 flex items-center px-4 border-none outline-none"
                  onClick={sendinMsg}
                >
                  {sendImg}
                </ShinyButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
