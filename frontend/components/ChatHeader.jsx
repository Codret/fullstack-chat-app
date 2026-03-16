
import { X } from "lucide-react";
import { useAuthStore } from "../src/store/useAuthStore";
import { useChatStore } from "../src/store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="sticky top-0 z-10 flex-shrink-0 bg-base-100 border-b border-base-300">
      <div className="flex items-center justify-between px-4 py-3">

        {/* ── Left: avatar + info ── */}
        <div className="flex items-center gap-3">

          {/* Avatar with online ring */}
          <div className="relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="size-10 rounded-full object-cover ring-2 ring-base-200"
            />
            {/* Online dot */}
            <span
              className={`absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-base-100
                ${isOnline ? "bg-success" : "bg-base-300"}`}
            />
          </div>

          {/* Name + status */}
          <div className="flex flex-col gap-0.5">
            <h3 className="font-semibold text-sm leading-tight tracking-tight">
              {selectedUser.fullName}
            </h3>
            <div className="flex items-center gap-1.5">
              <span
                className={`inline-block size-1.5 rounded-full
                  ${isOnline ? "bg-success" : "bg-base-content/25"}`}
              />
              <p
                className={`text-xs font-medium ${
                  isOnline ? "text-success" : "text-base-content/40"
                }`}
              >
                {isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>

        {/* ── Right: close button ── */}
        <button
          onClick={() => setSelectedUser(null)}
          className="size-8 flex items-center justify-center rounded-full
            text-base-content/40 hover:text-base-content hover:bg-base-200
            transition-all duration-150 active:scale-90"
          aria-label="Close chat"
        >
          <X size={16} strokeWidth={2.5} />
        </button>

      </div>
    </div>
  );
};

export default ChatHeader;
// import { X } from "lucide-react";
// import { useAuthStore } from "../src/store/useAuthStore";
// import { useChatStore } from "../src/store/useChatStore";

// const ChatHeader = () => {
//   const { selectedUser, setSelectedUser } = useChatStore();
//   const { onlineUsers } = useAuthStore();

//   return (
//     <div 
//     className="p-2.5 border-b border-base-300 flex-shrink-0 chat-header sticky top-0 z-10 bg-base-100">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           {/* Avatar */}
//           <div className="avatar">
//             <div className="size-10 rounded-full relative">
//               <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
//             </div>
//           </div>

//           {/* User info */}
//           <div>
//             <h3 className="font-medium">{selectedUser.fullName}</h3>
//             <p className="text-sm text-base-content/70">
//               {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
//             </p>
//           </div>
//         </div>

//         {/* Close button */}
//         <button className="absolute right-6" onClick={() => setSelectedUser(null)}>
//           <X />
//         </button>
//       </div>
//     </div>
//   );
// };
// export default ChatHeader;
