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
    const newSocket = io("http://localhost:3000"); // why no ws: ?

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
    const messageObject = {
      text: sentMessage,
      type: "sent",
      timestamp: new Date(),
    };
    if (socket && sentMessage) {
      console.log(messageObject);
      setRMessages((prev) => [...prev, messageObject]);
      socket.emit("message", sentMessage);
      setSentMessage("");
    }
  };

  return (
    <div>
      <div className="relative h-screen w-full rounded-lg border bg-background">
        <div className="absolute inset-0 bg-bl">
          <FlickeringGrid
            className="absolute inset-0 size-full"
            squareSize={3}
            gridGap={20}
            color="#000000"
            maxOpacity={0.15}
            flickerChance={3}
          />
          <div className="absolute inset-0 flex mt-10 justify-center z-20">
            <div className="fixed w-[600px] h-[550px]  flex items-center justify-center">
              <ChatMessages messages={rMessages} className="w-full h-full"/>
            </div>
          </div>
          
          {/* Notification Bubble Popup */}
          {notification && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
              <VerticalTiles>
                <ShimmerButton>
                {notification}
                </ShimmerButton>
              </VerticalTiles>
            </div>
          )}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center z-30">
            <div className="relative w-full max-w-150">
              <ShimmerButton className="absolute inset-0 w-full h-full rounded-xl border-2 shadow-xl pointer-events-none" />
              <div className="relative z-10 flex items-center gap-2 p-3 pointer-events-auto  rounded-4xl">
                <input
                  type="text"
                  placeholder="Enter here"
                  value={sentMessage}
                  onChange={(e) => setSentMessage(e.target.value)}
                  className="flex-1 h-10 px-4 rounded-md outline-none text-md"
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
