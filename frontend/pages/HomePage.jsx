import React from 'react'
import { useChatStore } from '../src/store/useChatStore'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import NoChatSelected from '../components/NoChatSelected'


const HomePage = () => {
  const {selectedUser, } = useChatStore()
  return (
    <div  className=' bg-base-200 h-screen ' >
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[ calc(100vh-8rem)]'>
          <div className='flex flex-col-12 h-screen'>
            <div className='flex-col-3'  >
            <Sidebar/>
            </div>
            <div className='flex-1 flex justify-center  rounded-lg overflow-hidden' >
              {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default HomePage