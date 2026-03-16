
import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../src/store/useChatStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessagesSkeleton from './skeletons/MessagesSkeleton'
import { useAuthStore } from '../src/store/useAuthStore'
import { formatMessageTime } from '../lib/utils'

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessage, unSubscribeToMessage } = useChatStore()
  const { authUser } = useAuthStore()
  const messageEndRef = useRef(null)

  useEffect(() => {
    getMessages(selectedUser._id)
    subscribeToMessage()
    return unSubscribeToMessage()
  }, [selectedUser._id, getMessages, unSubscribeToMessage, subscribeToMessage])

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessagesSkeleton />
        <MessageInput />
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-base-100">
      <ChatHeader />

      {/* ── Message list ── */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3">
        {messages.map((message, idx) => {
          const isMine = message.senderId === authUser._id
          const prevMessage = messages[idx - 1]
          const isConsecutive = prevMessage && prevMessage.senderId === message.senderId
          const avatar = isMine
            ? authUser.profilePic || "/avatar.png"
            : selectedUser.profilePic || "/avatar.png"

          return (
            <div
              key={message._id}
              ref={messageEndRef}
              className={`flex items-end gap-2 ${isMine ? "flex-row-reverse" : "flex-row"}`}
              style={{
                marginTop: isConsecutive ? "4px" : "16px",
              }}
            >
              {/* Avatar — hidden for consecutive messages */}
              <div
                className="shrink-0 mb-1"
                style={{ width: 34, opacity: isConsecutive ? 0 : 1 }}
              >
                <img
                  src={avatar}
                  alt="avatar"
                  className="size-8 rounded-full object-cover ring-2 ring-base-200"
                />
              </div>

              {/* Bubble + meta */}
              <div
                className={`flex flex-col gap-1 max-w-[70%] ${isMine ? "items-end" : "items-start"}`}
              >
                {/* Image attachment */}
                {message.image && (
                  <div
                    style={{
                      borderRadius: isMine
                        ? "18px 18px 4px 18px"
                        : "18px 18px 18px 4px",
                      overflow: "hidden",
                      maxWidth: 220,
                      boxShadow: "0 2px 12px oklch(var(--b3)/0.4)",
                    }}
                  >
                    <img
                      src={message.image}
                      alt="attachment"
                      className="block w-full object-cover"
                      style={{ maxHeight: 260 }}
                    />
                  </div>
                )}

                {/* Text bubble */}
                {message.text && (
                  <div
                    className={`px-4 py-2.5 text-sm leading-relaxed ${
                      isMine
                        ? "bg-primary text-primary-content"
                        : "bg-base-200 text-base-content"
                    }`}
                    style={{
                      borderRadius: isMine
                        ? isConsecutive
                          ? "18px 18px 4px 18px"
                          : "18px 18px 4px 18px"
                        : isConsecutive
                        ? "18px 18px 18px 4px"
                        : "18px 18px 18px 4px",
                      wordBreak: "break-word",
                      boxShadow: isMine
                        ? "0 2px 8px oklch(var(--p)/0.25)"
                        : "0 1px 4px oklch(var(--b3)/0.3)",
                    }}
                  >
                    {message.text}
                  </div>
                )}

                {/* Timestamp */}
                <time
                  className="text-xs opacity-40 px-1"
                  style={{ fontSize: "0.68rem" }}
                >
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
            </div>
          )
        })}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer

// import React, { useEffect, useRef } from 'react'
// import {useChatStore} from '../src/store/useChatStore'
// import ChatHeader from './ChatHeader'
// import MessageInput from './MessageInput'
// import MessagesSkeleton from './skeletons/MessagesSkeleton'
// import { useAuthStore } from '../src/store/useAuthStore'
// import { formatMessageTime } from '../lib/utils'
// import Navbar from './Navbar'

// const ChatContainer = () => {
//   const {messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessage, unSubscribeToMessage} = useChatStore()
//   const{authUser} = useAuthStore();
//   const messageEndRef = useRef(null);


//   useEffect(() => {
//     getMessages(selectedUser._id);
//     subscribeToMessage();

//     return unSubscribeToMessage();

//   }, [ selectedUser._id, getMessages,unSubscribeToMessage,subscribeToMessage ])
  
//   useEffect(() => {
//     if(messageEndRef.current && messages){
//       messageEndRef.current.scrollIntoView({ behavior: "smooth"})
      
//     }
//   }, [messages])
  


//   if(isMessagesLoading) {
//     return(
//     <div className='flex-1 flex flex-col overflow-auto '>
//       < ChatHeader/>
//       <MessagesSkeleton/>
//       <MessageInput/>
//     </div>
//     )
//   }


//   return (
//     <div className='flex-1 flex flex-col overflow-auto  '>
//       <ChatHeader/>

//       <div className='flex-1 overflow-y-auto p-4 space-y-4'>
//           {messages.map((message) =>(
//             <div key={message._id}
//             className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
//             ref={messageEndRef}
//             >
//               <div className='chat-image avatar'>
//                 <div className='size-10 rounded-full border'>
//                     <img 
//                     src={message.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"} alt="profile pic" />
//                 </div>
//               </div>
//               <div className='chat-header mb-1'>
//                   <time className='text-xs opacity-50 ml-1'>
//                     {formatMessageTime(message.createdAt)}
//                   </time>
//               </div>
//               <div className="chat-bubble flex flex-col">
//                 {message.image && (
//                   <img src={message.image} alt="attachment"
//                   className='sm:max-w-[200px] rounded-md mb-2'
//                   />
//                 )}
//                 {message.text && <p>{message.text}</p>}
//               </div>
//             </div>
//           ))}
//       </div>

//       <MessageInput/>

//     </div>
//   )
// }

// export default ChatContainer