// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { createSocketConnection } from "../../Utils/socket";
// import axios from "axios";
// import { BASE_URL } from "../../Utils/constants";

// const Chat = () => {
//   const { requestId } = useParams();
//   const [message, setMessage] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const user = useSelector((state) => state.user);
//   const userId = user?._id;

//   const fetchChatMessages = async () => {
//     const chat = await axios.get(BASE_URL + "/chat/" + requestId, {
//       withCredentials: true,
//     });

//     console.log(chat.data.message);

//     const chatMessages = chat?.data?.messages.map((msg) => {

//       const { senderId, text } = msg;
//       return {
//         firstName: senderId?.firstName,
//         lastName: senderId?.lastName,
//         text,
//       };
//     });
//     setMessage(chatMessages)
//   };

//   useEffect(() => {
//     fetchChatMessages();
//   }, []);

//   useEffect(() => {
//     if (!userId || !requestId) {
//       return;
//     }
//     const socket = createSocketConnection();
//     // as soon as the page is loaded connection is made and join chatt event is emitted

//     socket.emit("joinChat", { firstName: user.firstName, userId, requestId });

//     socket.on("messageReceived", ({ firstName,lastName, text }) => {
//       console.log(firstName + " " + text);

//       setMessage((message) => [...message, { firstName, lastName, text }]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId, requestId]);

//   const sendMessage = () => {
//     const socket = createSocketConnection();
//     socket.emit("sendMessage", {
//       firstName: user.firstName,
//       lastName:user.lastName,
//       userId,
//       requestId,
//       text: newMessage,
//     });
//     setNewMessage("");
//   };

//   return (
//     <div className="w-3/4 mx-auto m-5 border border-gray-600 h-[70vh] flex flex-col">
//       <h1 className="p-5 border-b border-gray-600">Chat</h1>

//       <div className="flex-1 overflow-auto p-5">
//         {/* Display messages */}

//         {message.map((msg, index) => {
//           return (
//             <React.Fragment key={index}>
//               <div className={"chat " + (user.firstName === msg.firstName ? "chat-end" : "chat-start")}>
//                 <div className="chat-header">
//                   {`${msg.firstName} ${msg.lastName}`}
//                   <time className="text-xs opacity-50">2 hours ago</time>
//                 </div>
//                 <div>{msg.text}</div>
//                 <div className="chat-bubble">{msg.text}</div>
//                 <div className="chat-footer opacity-50">Seen</div>
//               </div>
//             </React.Fragment>
//           );
//         })}
//       </div>

//       <div className="p-5 border-t border-gray-600 flex items-center gap-2">
//         <input
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           type="text"
//           className="flex-1 border border-gray-400 rounded py-2 text-white"
//           placeholder="Type your message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;

import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../Utils/constants";
import { createSocketConnection } from "../../Utils/socket";

let socket; // Declare socket outside the component to reuse it

const Chat = () => {
  const { requestId } = useParams();
  const user = useSelector((state) => state.user);
  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const fetchChatMessages = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/chat/${requestId}`, {
        withCredentials: true,
      });
      const chatMessages = res?.data?.messages.map(({ senderId, text }) => ({
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      }));
      setMessages(chatMessages);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId || !requestId) return;

    socket = createSocketConnection();
    socket.emit("joinChat", { firstName: user.firstName, userId, requestId });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((prev) => [...prev, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, requestId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      requestId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-full md:w-3/4 mx-auto mt-5 border border-gray-600 h-[70vh] flex flex-col rounded-lg shadow">
      <header className="bg-base-200 px-5 py-3 border-b border-gray-600 text-lg font-semibold">
        Chat
      </header>

      <div className="flex-1 overflow-auto p-4 space-y-4 bg-base-100">
        {messages.map((msg, idx) => {
          const isOwnMessage = user.firstName === msg.firstName;
          return (
            <div key={idx} className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}>
              <div className="chat-header font-medium text-sm text-gray-500">
                {msg.firstName} {msg.lastName}
              </div>
              <div className="chat-bubble bg-blue-500 text-white">{msg.text}</div>
              <div className="chat-footer text-xs opacity-60">Seen</div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <footer className="p-4 border-t border-gray-600 bg-base-200 flex items-center gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-400 rounded px-3 py-2 bg-base-100 text-white focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default Chat;
