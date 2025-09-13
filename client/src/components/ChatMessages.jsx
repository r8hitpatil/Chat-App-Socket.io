import React, { useEffect, useRef } from "react";
import { TextAnimate } from "@/components/magicui/text-animate";

const ChatMessages = ({ messages, className = "" }) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Format timestamp to readable time
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className={`flex flex-col h-full overflow-y-auto p-3 md:p-4 space-y-2 md:space-y-3 ${className}`}
    >
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full text-gray-500 text-sm md:text-base">
          <div className="text-center">
            <p>No messages yet...</p>
            <p className="text-xs md:text-sm mt-1">Start the conversation!</p>
          </div>
        </div>
      )}
      
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex flex-col ${
            msg.type === "sent" ? "items-end" : "items-start"
          }`}
        >
          {/* Message Bubble */}
          <div
            className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-3 md:px-4 py-2 md:py-3 rounded-lg break-words text-sm md:text-base ${
              msg.type === "sent"
                ? "bg-indigo-500 text-white rounded-br-none shadow-lg"
                : msg.type === "notification"
                ? "bg-yellow-100 text-yellow-800 rounded-lg shadow-sm border border-yellow-200 self-center"
                : "bg-white text-gray-800 rounded-bl-none shadow-lg border"
            }`}
            style={{ lineHeight: '1.4' }}
          >
            {msg.type === "notification" ? (
              <div className="text-center text-xs md:text-sm font-medium">
                {msg.text}
              </div>
            ) : (
              <TextAnimate animation="blurInUp" by="word" once>
                {msg.text}
              </TextAnimate>
            )}
          </div>

          {/* Timestamp - Hide for notifications */}
          {msg.type !== "notification" && (
            <span className="text-xs text-gray-500 mt-1 px-1">
              {formatTime(msg.timestamp)}
            </span>
          )}
        </div>
      ))}

      {/* Auto-scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
