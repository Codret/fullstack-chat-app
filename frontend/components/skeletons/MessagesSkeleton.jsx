
const MessageSkeleton = () => {
  const rows = [
    { side: "start", bubbleW: 220, bubbleH: 64 },
    { side: "end", bubbleW: 180, bubbleH: 48 },
    { side: "start", bubbleW: 260, bubbleH: 80 },
    { side: "end", bubbleW: 200, bubbleH: 64 },
    { side: "start", bubbleW: 150, bubbleH: 48 },
    { side: "end", bubbleW: 240, bubbleH: 72 },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
      {rows.map((row, idx) => {
        const isEnd = row.side === "end";
        return (
          <div
            key={idx}
            className={`flex items-end gap-2.5 ${isEnd ? "flex-row-reverse" : "flex-row"}`}
            style={{ opacity: 1 - idx * 0.07 }}
          >
            {/* Avatar */}
            <div className="skeleton size-9 rounded-full shrink-0" />

            {/* Content */}
            <div className={`flex flex-col gap-1.5 max-w-[65%] ${isEnd ? "items-end" : "items-start"}`}>
              {/* Name */}
              <div className="skeleton h-2.5 w-16 rounded-full" />

              {/* Bubble */}
              <div
                className="skeleton"
                style={{
                  width: row.bubbleW,
                  height: row.bubbleH,
                  borderRadius: isEnd ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
                }}
              />

              {/* Timestamp */}
              <div className="skeleton h-2 w-9 rounded-full opacity-50" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageSkeleton;
// const MessageSkeleton = () => {
//   // Create an array of 6 items for skeleton messages
//   const skeletonMessages = Array(6).fill(null);

//   return (
//     <div className="flex-1 overflow-y-auto p-4 space-y-4">
//       {skeletonMessages.map((_, idx) => (
//         <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
//           <div className="chat-image avatar">
//             <div className="size-10 rounded-full">
//               <div className="skeleton w-full h-full rounded-full" />
//             </div>
//           </div>

//           <div className="chat-header mb-1">
//             <div className="skeleton h-4 w-16" />
//           </div>

//           <div className="chat-bubble bg-transparent p-0">
//             <div className="skeleton h-16 w-[200px]" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MessageSkeleton;
