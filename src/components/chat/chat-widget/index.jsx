import React, { useEffect, useState, useRef } from "react";
import { Offcanvas, Button, Form, ListGroup, Modal } from "react-bootstrap";
import io from "socket.io-client";
import { api } from "../../../helpers";
import { IoChatboxEllipses } from "react-icons/io5";

import "./style.scss";
import { useChat } from "../../../context/chatContext";
import useChatService from "../../../service/chatService";

const socket = io(api);

const ChatWidget = ({ userId }) => {
  const { activeChatId, openChat, closeChat, chatVisible } = useChat();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [chatList, setChatList] = useState([]);
  const [unread, setUnread] = useState(false);
  const [faqShow, setFaqShow] = useState(false);
  const [faqTopics, setFaqTopics] = useState([]);
  const messageEndRef = useRef(null);
  const { getChatHistory, getChatsForUser, getHelpTopics, sendMessageRest } =
    useChatService();

  // Получаем чаты
  useEffect(() => {
    getChatsForUser(setChatList);
  }, []);

  // Загружаем историю при выборе
  useEffect(() => {
    if (activeChatId) {
      socket.emit("joinChat", { chatId: activeChatId });
      getChatHistory(activeChatId, setMessages);
      setUnread(false);
    }
  }, [activeChatId]);

  // Получаем сообщение в реальном времени
  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      if (message.chatId === activeChatId) {
        setMessages((prev) => [...prev, message]);
      } else {
        setUnread(true);
        getChatsForUser().then(setChatList);
      }
    });
    return () => socket.off("receiveMessage");
  }, [activeChatId]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (text.trim()) {
      const msg = {
        chatId: activeChatId,
        senderId: userId,
        text,
        timestamp: new Date(),
      };
      socket.emit("sendMessage", msg);
      // setMessages((prev) => [...prev, msg]);
      setText("");
      sendMessageRest(activeChatId, userId, text);
    }
  };

  const openSpecificChat = (id) => {
    openChat(id);
    socket.emit("joinChat", { chatId: id });
    getChatHistory(id, setMessages);
    setUnread(false);
  };

  const openFaq = () => {
    getHelpTopics(setFaqTopics);
    setFaqShow(true);
  };

  const handleFaqSelect = (topic) => {
    setText(topic);
    setFaqShow(false);
  };

  return (
    <div className={`chat-widget ${chatVisible ? "chat-widget--active" : ""}`}>
      {/* Кружок */}
      <div className="chat-widget__icon" onClick={() => openChat(null)}>
        <IoChatboxEllipses />
        {unread && <span className="chat-widget__badge" />}
      </div>

      {/* Окно чата */}
      <Offcanvas
        show={chatVisible}
        onHide={closeChat}
        placement="end"
        className="chat-widget__offcanvas"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Chat</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="chat-widget__body">
          {/* Список чатов */}
          <div className="chat-widget__list">
            <ListGroup>
              {chatList.map((chat) => (
                <ListGroup.Item
                  key={chat.chatId}
                  action
                  onClick={() => openSpecificChat(chat.chatId)}
                  active={chat.chatId === activeChatId}
                >
                  <strong>{chat.otherUser}</strong>
                  <br />
                  <small>{chat.productName}</small>
                  <br />
                  <em>{chat.lastMessage}</em>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>

          {/* Переписка */}
          <div className="chat-widget__content">
            {activeChatId ? (
              <>
                <div className="chat-widget__header"></div>
                <div className="chat-widget__messages">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`chat-widget__message ${msg.senderId === userId ? "user" : "other"}`}
                    >
                      <p className="chat-widget__text">{msg.text}</p>
                      <span className="chat-widget__time">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  ))}
                  <div ref={messageEndRef} />
                </div>
                <div className="chat-widget__input-area">
                  <Form.Control
                    type="text"
                    className="chat-widget__input"
                    placeholder="..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <button
                    onClick={sendMessage}
                    className="chat-send-button"
                  >
                    Отправить
                  </button>
                </div>
              </>
            ) : (
              <div className="text-muted m-2">
                Select a chat on the left or start a new one
              </div>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* FAQ Модалка */}
      <Modal show={faqShow} onHide={() => setFaqShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Частые вопросы</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {faqTopics.map((topic, idx) => (
              <ListGroup.Item
                key={idx}
                action
                onClick={() => handleFaqSelect(topic)}
              >
                {topic}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ChatWidget;
