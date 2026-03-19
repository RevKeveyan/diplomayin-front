import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [chatVisible, setChatVisible] = useState(false);
  const [activeChatId, setActiveChatId] = useState(null);

  const openChat = (chatId) => {
    setChatVisible(true);
    if (chatId) setActiveChatId(chatId);
  };

  const closeChat = () => {
    setChatVisible(false);
    setActiveChatId(null);
  };

  return (
    <ChatContext.Provider value={{ chatVisible, activeChatId, openChat, closeChat }}>
      {children}
    </ChatContext.Provider>
  );
};
