

import React, { useEffect, useState } from 'react'
import { useChatStore } from '../src/store/useChatStore'
import SidebarSkeleton from './skeletons/SidebarSkeleton'
import { Users } from 'lucide-react'
import { useAuthStore } from '../src/store/useAuthStore'

const Sidebar = () => {
  const { getUsers, users, selectedUser, isUsersLoading, setSelectedUser } = useChatStore()
  const { onlineUsers } = useAuthStore()
  const [showOnlineOnly, setShowOnlineOnly] = useState(null)

  const filteredUsers = showOnlineOnly
    ? users.filter(user => onlineUsers.includes(user._id))
    : users

  useEffect(() => {
    getUsers()
  }, [getUsers])

  if (isUsersLoading) return <SidebarSkeleton />

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">

      {/* ── Header ── */}
      <div className="border-b border-base-300 w-full px-4 py-4">

        {/* Title row */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Users className="size-4 text-primary" strokeWidth={2} />
          </div>
          <span
            className="font-bold text-sm tracking-tight hidden lg:block"
            style={{ letterSpacing: "-0.01em" }}
          >
            Contacts
          </span>

          {/* Online pill — desktop */}
          <span
            className="hidden lg:inline-flex items-center gap-1 ml-auto
              text-xs font-medium px-2 py-0.5 rounded-full
              bg-success/10 text-success"
          >
            <span className="size-1.5 rounded-full bg-success inline-block" />
            {onlineUsers.length - 1}
          </span>
        </div>

        {/* Online filter toggle — desktop */}
        <label className="hidden lg:flex items-center gap-2.5 cursor-pointer group">
          <div
            className={`relative w-8 h-4 rounded-full transition-colors duration-200
              ${showOnlineOnly ? "bg-primary" : "bg-base-300"}`}
            onClick={() => setShowOnlineOnly(v => !v)}
          >
            <div
              className={`absolute top-0.5 size-3 rounded-full bg-white shadow
                transition-transform duration-200
                ${showOnlineOnly ? "translate-x-4" : "translate-x-0.5"}`}
            />
          </div>
          <input
            type="checkbox"
            checked={!!showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="hidden"
          />
          <span className="text-xs text-base-content/50 group-hover:text-base-content/70 transition-colors">
            Online only
          </span>
        </label>
      </div>

      {/* ── User list ── */}
      <div className="overflow-y-auto flex-1 py-2">
        {filteredUsers.map((user) => {
          const isOnline = onlineUsers.includes(user._id)
          const isActive = selectedUser?._id === user._id

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full flex items-center gap-3 px-3 py-2.5
                transition-all duration-150 relative group
                ${isActive
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-base-200 text-base-content"
                }`}
            >
              {/* Active indicator bar */}
              <div
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-0.5 rounded-r-full
                  bg-primary transition-all duration-200
                  ${isActive ? "h-8 opacity-100" : "h-0 opacity-0"}`}
              />

              {/* Avatar */}
              <div className="relative mx-auto lg:mx-0 shrink-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className={`size-11 object-cover rounded-full transition-all duration-150
                    ${isActive
                      ? "ring-2 ring-primary ring-offset-1 ring-offset-base-100"
                      : "ring-2 ring-base-300"
                    }`}
                />
                {isOnline && (
                  <span className="absolute bottom-0 right-0 size-2.5 rounded-full
                    bg-success border-2 border-base-100" />
                )}
              </div>

              {/* User info */}
              <div className="hidden lg:flex flex-col min-w-0 flex-1 text-left">
                <span
                  className={`text-sm font-medium truncate leading-tight
                    ${isActive ? "text-primary" : "text-base-content"}`}
                >
                  {user.fullName}
                </span>
                <span
                  className={`text-xs mt-0.5 font-medium
                    ${isOnline ? "text-success" : "text-base-content/35"}`}
                >
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>

              {/* Online dot for collapsed sidebar */}
              {isOnline && (
                <div className="lg:hidden absolute top-2 right-2 size-1.5
                  rounded-full bg-success" />
              )}
            </button>
          )
        })}

        {/* Empty state */}
        {filteredUsers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4 gap-2">
            <div className="size-10 rounded-2xl bg-base-200 flex items-center justify-center mb-1">
              <Users className="size-5 text-base-content/25" />
            </div>
            <p className="text-sm font-medium text-base-content/40">No users online</p>
            <p className="text-xs text-base-content/25 text-center">
              Check back later or disable the filter
            </p>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar



// import React, { useEffect, useState } from 'react'
// import { useChatStore } from '../src/store/useChatStore'
// import SidebarSkeleton from './skeletons/SidebarSkeleton';
// import { Users } from 'lucide-react';
// import { useAuthStore } from '../src/store/useAuthStore';


// const Sidebar = () => {
//     const { getUsers, users, selectedUser, isUsersLoading, isMessagesLoading, setSelectedUser} = useChatStore()

//     const { onlineUsers } = useAuthStore();
//     const [showOnlineOnly, setShowOnlineOnly] = useState(null);

//     const filteredUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users;

//     useEffect(() => {
//       getUsers();
//     }, [getUsers])
//     // useEffect(() => {
//     //   users();
//     // }, [users])
    
//     if(isUsersLoading) return <SidebarSkeleton/>
//   return (
//     <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
//       <div className="border-b border-base-300 w-full p-5">
//         <div className="flex items-center gap-2">
//           <Users className="size-6" />
//           <span className="font-medium hidden lg:block">Contacts</span>
//         </div>
       
//         <div className="mt-3 hidden lg:flex items-center gap-2">
//           <label className="cursor-pointer flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={showOnlineOnly}
//               onChange={(e) => setShowOnlineOnly(e.target.checked)}
//               className="checkbox checkbox-sm"
//             />
//             <span className="text-sm">Show online only</span>
//           </label>
//           <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
//         </div>
//       </div>

//       <div className="overflow-y-auto w-full py-3 h-screen">
//         {filteredUsers.map((user) => (
//           <button
//           key={user._id}
//           onClick={() => {setSelectedUser(user)}}
//           className={`
//             w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors
//             ${selectedUser?._id === user._id ? "bg-base-300 ring-base-300 " : ""}
//             `}
//           >
//             <div className="relative mx-auto lg:mx-0">
//               <img src={user.profilePic || "/avatar.png"} alt={user.name} 
//             className='size-12 object-cover rounded-full'
//             />
//             {onlineUsers.includes(user._id) && (
//               <span
//               className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900'
//               ></span>
//             )}
//             </div>

//             {/* User info - only visible on larger screens */}
//             <div className="hidden lg:block text-left min-w-0">
//               <div className="font-medium truncate">{user.fullName}</div>
//               <div className="text-sm text-zinc-400">
//                 {onlineUsers.includes(user._id) ? "Online" : "Offline"}
//               </div>
//             </div>
//           </button>
//         ))}

//         {filteredUsers.length === 0 && (
//           <div className='text-center text-zinc-500 py-4'> No Online Users</div>
//         )}
//       </div>
//     </aside>
//   )
// }

// export default Sidebar