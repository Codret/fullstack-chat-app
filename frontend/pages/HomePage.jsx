
import React from 'react'
import { useChatStore } from '../src/store/useChatStore'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import NoChatSelected from '../components/NoChatSelected'

const HomePage = () => {
  const { selectedUser } = useChatStore()

  return (
    <div className="bg-base-200 min-h-screen flex items-center justify-center p-4 pt-20">

      {/* ── Ambient background glow ── */}
      <div
        className="fixed inset-0 pointer-events-none -z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(var(--p)/0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Main chat window ── */}
      <div
        className="relative z-10 w-full max-w-6xl flex flex-col"
        style={{ height: "calc(100vh - 6rem)" }}
      >
        <div
          className="flex flex-1 overflow-hidden rounded-2xl"
          style={{
            background: "oklch(var(--b1))",
            boxShadow:
              "0 0 0 1px oklch(var(--b3)/0.8), 0 24px 64px -12px oklch(var(--b3)/0.5)",
          }}
        >

          {/* Sidebar */}
          <Sidebar />

          {/* Chat panel */}
          <div className="flex-1 flex overflow-hidden">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>

        </div>
      </div>

    </div>
  )
}

export default HomePage

// import React from 'react'
// import { useChatStore } from '../src/store/useChatStore'
// import Sidebar from '../components/Sidebar'
// import ChatContainer from '../components/ChatContainer'
// import NoChatSelected from '../components/NoChatSelected'


// const HomePage = () => {
//   const {selectedUser, } = useChatStore()
//   return (
//     <div  className=' bg-base-200 h-screen ' >
//       <div className='flex items-center justify-center pt-20 px-4'>
//         <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[ calc(100vh-8rem)]'>
//           <div className='flex flex-col-12 h-screen'>
//             <div className='flex-col-3'  >
//             <Sidebar/>
//             </div>
//             <div className='flex-1 flex justify-center  rounded-lg overflow-hidden' >
//               {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default HomePage