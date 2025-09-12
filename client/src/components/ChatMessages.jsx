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
      className={`flex flex-col h-full overflow-y-auto p-4 space-y-3 ${className}`}
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex flex-col ${
            msg.type === "sent" ? "items-end" : "items-start"
          }`}
        >
          {/* Message Bubble */}
          <div
            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg break-words ${
              msg.type === "sent"
                ? "bg-indigo-400 text-white rounded-bl-none shadow-xl shadow-indigo-200"
                : "bg-white text-gray-800 rounded-bl-none shadow-xl"
            }`}
            style={{ fontSize: '16px', lineHeight: '1.4' }}
          >
           <TextAnimate animation="blurInUp" by="word" once>
              {msg.text}
            </TextAnimate>
          </div>

          {/* Timestamp */}
          <span className="text-xs text-gray-500 mt-1">
            {formatTime(msg.timestamp)}
          </span>
        </div>
      ))}

      {/* Auto-scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
