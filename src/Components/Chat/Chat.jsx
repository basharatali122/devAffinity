import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../Utils/socket";
import axios from "axios";
import { BASE_URL } from "../../Utils/constants";

const Chat = () => {
  const { requestId } = useParams();
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((state) => state.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + requestId, {
      withCredentials: true,
    });

    console.log(chat.data.message);

    const chatMessages = chat?.data?.messages.map((msg) => {

      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });
    setMessage(chatMessages)
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId || !requestId) {
      return;
    }
    const socket = createSocketConnection();
    // as soon as the page is loaded connection is made and join chatt event is emitted

    socket.emit("joinChat", { firstName: user.firstName, userId, requestId });

    socket.on("messageReceived", ({ firstName,lastName, text }) => {
      console.log(firstName + " " + text);

      setMessage((message) => [...message, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, requestId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName:user.lastName,
      userId,
      requestId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto m-5 border border-gray-600 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>

      <div className="flex-1 overflow-auto p-5">
        {/* Display messages */}

        {message.map((msg, index) => {
          return (
            <React.Fragment key={index}>
              <div className={"chat " + (user.firstName === msg.firstName ? "chat-end" : "chat-start")}>
                <div className="chat-header">
                  {`${msg.firstName} ${msg.lastName}`}
                  <time className="text-xs opacity-50">2 hours ago</time>
                </div>
                <div>{msg.text}</div>
                <div className="chat-bubble">{msg.text}</div>
                <div className="chat-footer opacity-50">Seen</div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          className="flex-1 border border-gray-400 rounded py-2 text-white"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
