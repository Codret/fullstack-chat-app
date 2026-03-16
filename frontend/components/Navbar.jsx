
import React from 'react'
import { useAuthStore } from '../src/store/useAuthStore'
import { LogOut, MessageSquare, Settings, User } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { authUser, logout } = useAuthStore()

  return (
    <header className="fixed top-0 w-full z-40 bg-base-100/80 backdrop-blur-xl border-b border-base-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group transition-opacity hover:opacity-90"
          >
            <div
              className="size-9 rounded-xl bg-primary/10 flex items-center justify-center
                group-hover:bg-primary/20 transition-colors duration-200"
            >
              <MessageSquare className="size-5 text-primary" strokeWidth={2} />
            </div>
            <span
              className="text-base font-bold tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              Hyee
            </span>
          </Link>

          {/* ── Nav actions ── */}
          <div className="flex items-center gap-1">

            {/* Settings */}
            <Link
              to="/settings"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium
                text-base-content/60 hover:text-base-content hover:bg-base-200
                transition-all duration-150 active:scale-95"
            >
              <Settings className="size-4" strokeWidth={2} />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                {/* Divider */}
                <div className="hidden sm:block w-px h-5 bg-base-300 mx-1" />

                {/* Profile */}
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium
                    text-base-content/60 hover:text-base-content hover:bg-base-200
                    transition-all duration-150 active:scale-95"
                >
                  {/* Avatar or icon */}
                  {authUser.profilePic ? (
                    <img
                      src={authUser.profilePic}
                      alt={authUser.fullName}
                      className="size-6 rounded-full object-cover ring-2 ring-base-300"
                    />
                  ) : (
                    <User className="size-4" strokeWidth={2} />
                  )}
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                {/* Logout */}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium
                    text-base-content/60 hover:text-error hover:bg-error/10
                    transition-all duration-150 active:scale-95"
                  aria-label="Logout"
                >
                  <LogOut className="size-4" strokeWidth={2} />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  )
}

export default Navbar

// import React from 'react'
// import { useAuthStore } from '../src/store/useAuthStore'
// import { LogOut, MessageSquare, Settings, User } from 'lucide-react'
// import { Link } from 'react-router-dom'
// import { useChatStore } from '../src/store/useChatStore'

// const Navbar = () => {
//     const { authUser, logout } = useAuthStore()
//   //   const { selectedUser } = useChatStore(); // ✅ Get selectedUser from chat store

//   // // ✅ Hide navbar if a chat is selected
//   // if (selectedUser) return null;
  
//   return (
//     <header
//       className="bg-base-100  border-b border-base-300 fixed w-full top-0 navbar z-40 
//     backdrop-blur-lg "
//     >
//       <div className="container mx-auto px-4 h-16">
//         <div className="flex items-center  justify-between h-full">
//           <div className="flex items-center gap-8">
//             <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
//               <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
//                 <MessageSquare className="w-5 h-5 text-primary" />
//               </div>
//               <h1 className="text-lg font-bold">Hyee</h1>
//             </Link>
//           </div>

//           <div className="flex items-center gap-2">
//             <Link
//               to={"/settings"}
//               className={`
//               btn btn-sm gap-2 transition-colors
              
//               `}
//             >
//               <Settings className="w-4 h-4" />
//               <span className="hidden sm:inline">Settings</span>
//             </Link>

//             {authUser && (
//               <>
//                 <Link to={"/profile"} className={`btn btn-sm gap-2`}>
//                   <User className="size-5" />
//                   <span className="hidden sm:inline">Profile</span>
//                 </Link>

//                 <button className="flex gap-2 items-center" onClick={logout}>
//                   <LogOut className="size-5" />
//                   <span className="hidden sm:inline">Logout</span>
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }

// export default Navbar