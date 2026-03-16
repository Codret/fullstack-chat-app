
import React, { useState, useRef } from 'react'
import { useChatStore } from '../src/store/useChatStore'
import { Image, Send, X } from 'lucide-react'
import toast from 'react-hot-toast'

const MessageInput = () => {
  const [text, setText] = useState("")
  const [imagePreview, setImagePreview] = useState(null)
  const { sendMessage, selectedUser } = useChatStore()
  const fileInputRef = useRef(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => setImagePreview(reader.result)
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!text.trim() && !imagePreview) return
    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
        receiverId: selectedUser._id,
      })
      setText("")
      setImagePreview(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
    } catch (error) {
      console.error("Failed to Send Message:", error)
    }
  }

  const canSend = text.trim() || imagePreview

  return (
    <div
      className="flex-shrink-0 bg-base-100 border-t border-base-300"
      style={{ padding: "12px 16px 14px" }}
    >

      {/* ── Image preview strip ── */}
      {imagePreview && (
        <div
          className="mb-3 flex items-center gap-3 px-1"
        >
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="object-cover rounded-xl border border-base-300"
              style={{ width: 72, height: 72 }}
            />
            {/* Dimming overlay on hover */}
            <div
              className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/20 transition-all duration-150"
            />
            {/* Remove button */}
            <button
              onClick={removeImage}
              type="button"
              className="absolute -top-2 -right-2 size-5 rounded-full bg-base-300
                hover:bg-error hover:text-error-content
                flex items-center justify-center shadow-sm
                transition-all duration-150 active:scale-90"
              aria-label="Remove image"
            >
              <X size={11} strokeWidth={2.5} />
            </button>
          </div>

          {/* Filename hint */}
          <p className="text-xs text-base-content/40 italic">Image attached</p>
        </div>
      )}

      {/* ── Input row ── */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-end gap-2"
      >

        {/* Text input + attach button wrapper */}
        <div
          className="flex-1 flex items-end gap-0 bg-base-200 rounded-2xl
            ring-1 ring-base-300 focus-within:ring-primary/50
            transition-all duration-200 overflow-hidden"
          style={{ minHeight: 44 }}
        >

          {/* Attach image button — inside the input pill */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`hidden sm:flex items-center justify-center shrink-0
              size-11 transition-all duration-150 active:scale-90
              ${imagePreview
                ? "text-success"
                : "text-base-content/35 hover:text-base-content/70"
              }`}
            aria-label="Attach image"
          >
            <Image size={18} />
          </button>

          {/* Text input */}
          <input
            type="text"
            className="flex-1 bg-transparent text-sm outline-none
              placeholder:text-base-content/30 py-3 pr-3
              sm:pl-0 pl-4"
            placeholder="Type a message…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        {/* Send button */}
        <button
          type="submit"
          disabled={!canSend}
          className={`shrink-0 size-11 rounded-full flex items-center justify-center
            transition-all duration-200 active:scale-90
            ${canSend
              ? "bg-primary text-primary-content shadow-md hover:brightness-110"
              : "bg-base-200 text-base-content/25 cursor-not-allowed"
            }`}
          aria-label="Send message"
        >
          <Send
            size={17}
            strokeWidth={2.2}
            style={{
              transform: canSend ? "translateX(1px)" : "none",
              transition: "transform 0.15s ease",
            }}
          />
        </button>
      </form>
    </div>
  )
}

export default MessageInput


// import React, { useState } from 'react'
// import { useChatStore } from '../src/store/useChatStore';
// import { Image, Send, X } from 'lucide-react';
// import { useRef } from 'react';
// import toast from 'react-hot-toast';

// const MessageInput = () => {
//     const [text, setText] = useState("");
//     const [imagePreview, setImagePreview] = useState(null);
//     const {sendMessage, selectedUser} = useChatStore();
//     const fileInputRef = useRef(null)

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if(!file.type.startsWith("image/")){
//             toast.error("Please select an image file");
//             return;
//         }

//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setImagePreview(reader.result);
//         };

//         reader.readAsDataURL(file);
//     };

//     const removeImage = () => {
//         setImagePreview(null);
//         if(fileInputRef.current) fileInputRef.current.value = "";
//     };

//     const handleSendMessage = async (e) => {
//         e.preventDefault()
//         if(!text.trim() && !imagePreview) return;

//         try {
//             await sendMessage({
//                 text: text.trim(),
//                 image: imagePreview,
//                 receiverId: selectedUser._id,
//             });
//             //clear form
//             setText("")
//             setImagePreview(null);
//             if(fileInputRef.current) fileInputRef.current.value = "";
//         } catch (error) {
//             console.error("Failed to Send Message:", error)
//         }
//     }

//   return (
//     <div className="p-4 w-full flex"
//     >
//       {imagePreview && (
//         <div className="mb-3 flex items-center gap-2">
//           <div className="relative">
//             <img
//               src={imagePreview}
//               alt="Preview"
//               className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
//             />
//             <button
//               onClick={removeImage}
//               className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
//               flex items-center justify-center"
//               type="button"
//             >
//               <X className="size-3" />
//             </button>
//           </div>
//         </div>
//       )}

//       <form onSubmit={handleSendMessage} className='flex items-center gap-2 flex-1 '>
//         <div className='flex-1 flex gap-2'>
//             <input
//             type="text"
//             className='w-full input input-bordered rounded-lg input-sm sm:input-md'
//             placeholder='Type a message....'
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             />

//             <input
//             type="file"
//             accept='image/*'
//             className='hidden'
//             ref={fileInputRef}
//             onChange={handleImageChange}

//              />

//             <button
//             type='button'
//             className={`hidden sm:flex btn btn-circle
//                 ${imagePreview? "text-emerald-500 ": "text-zinc-400"}
//                 `}
//             onClick={() => fileInputRef.current?.click()}
//             >
//                 <Image size={20}/>
//             </button>

//         </div>

//         <button
//         type='submit'
//         className='btn btn-sm btn-circle '
//         disabled = {!text.trim() && !imagePreview}
//         >
//             <Send size={25}/>
//         </button>
//       </form>

//     </div>
//   )
// }

// export default MessageInput