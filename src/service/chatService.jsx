import { api } from "../helpers";
import { useHttp } from "../hook/http.hook";
import { useToast } from "../context/toastContext";

const useChatService = () => {
  const { loadingStatus, request } = useHttp();
  const { handleToast } = useToast();
  const user = localStorage.getItem("user")
  const chatRoute = `${api}/chat`;

  const initChat = async (buyerId, sellerId, productId) => {
    try {
      const res = await request(`${chatRoute}/init`, "POST", JSON.stringify({ buyerId, sellerId, productId }));
      return res.chatId;
    } catch (e) {
      handleToast("error", "Please log in first");
    }
  };

  const getChatsForUser = async (setChats) => {
    try {
      const res = await request(`${chatRoute}/my-chats/${user}`, "GET", null, {
        "Content-Type": "application/json",
        userId: localStorage.getItem("userId"), // передаём userId
      });
      setChats(res.chats);
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  const getChatHistory = async (chatId, setMessages) => {
    try {
      const res = await request(`${chatRoute}/${chatId}`, "GET");
      setMessages(res.messages || []);
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  const getHelpTopics = async (setTopics) => {
    try {
      const res = await request(`${chatRoute}/help-topics/${user}`, "GET");
      setTopics(res.topics || []);
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  const sendMessageRest = async (chatId, senderId, text) => {
    try {
      await request(`${chatRoute}/send/${user}`, "POST", JSON.stringify({ chatId, senderId, text }));
    } catch (e) {
      handleToast("error", e.message);
    }
  };

  return {
    initChat,
    getChatsForUser,
    getChatHistory,
    getHelpTopics,
    sendMessageRest,
    loadingStatus,
  };
};

export default useChatService;
