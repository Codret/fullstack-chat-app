
import { MessageSquare } from 'lucide-react'
import React from 'react'

const NoChatSelected = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-base-100 relative overflow-hidden">

      {/* ── Ambient background orbs ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 360,
          height: 360,
          borderRadius: "50%",
          background: "radial-gradient(circle, oklch(var(--p)/0.07) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -60%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, oklch(var(--p)/0.05) 0%, transparent 70%)",
          bottom: "20%",
          right: "20%",
        }}
      />

      {/* ── Main card ── */}
      <div className="relative z-10 max-w-sm w-full text-center px-8 space-y-6">

        {/* Icon stack */}
        <div className="flex justify-center mb-2">
          <div className="relative">

            {/* Outer ring pulse */}
            <div
              className="absolute inset-0 rounded-3xl animate-ping"
              style={{
                background: "oklch(var(--p)/0.12)",
                animationDuration: "2.4s",
              }}
            />

            {/* Mid ring */}
            <div
              className="absolute -inset-2 rounded-3xl"
              style={{
                background: "oklch(var(--p)/0.07)",
                borderRadius: 28,
              }}
            />

            {/* Icon container */}
            <div
              className="relative size-20 rounded-3xl flex items-center justify-center"
              style={{
                background: "oklch(var(--p)/0.12)",
                boxShadow: "0 0 0 1px oklch(var(--p)/0.2), 0 8px 32px oklch(var(--p)/0.15)",
              }}
            >
              <MessageSquare
                className="text-primary"
                size={36}
                strokeWidth={1.8}
              />
            </div>

            {/* Three decorative dots */}
            {[
              { top: -6, right: -6, size: 10, opacity: 0.5, delay: "0s" },
              { top: 10, right: -16, size: 6, opacity: 0.3, delay: "0.4s" },
              { bottom: -4, left: -10, size: 8, opacity: 0.4, delay: "0.8s" },
            ].map((dot, i) => (
              <div
                key={i}
                className="absolute rounded-full animate-pulse"
                style={{
                  width: dot.size,
                  height: dot.size,
                  top: dot.top,
                  right: dot.right,
                  bottom: dot.bottom,
                  left: dot.left,
                  background: `oklch(var(--p)/${dot.opacity})`,
                  animationDelay: dot.delay,
                  animationDuration: "2s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-2.5">
          <h2
            className="font-bold text-2xl"
            style={{ letterSpacing: "-0.03em", lineHeight: 1.2 }}
          >
            Welcome to{" "}
            <span className="text-primary">Hyee</span>
            <span className="text-base-content/30">!</span>
          </h2>

          <p className="text-sm text-base-content/50 leading-relaxed">
            Select a conversation from the sidebar
            <br />to start chatting
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 px-4">
          <div className="flex-1 h-px bg-base-300" />
          <div
            className="size-1.5 rounded-full"
            style={{ background: "oklch(var(--p)/0.35)" }}
          />
          <div className="flex-1 h-px bg-base-300" />
        </div>

        {/* Feature hints */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { emoji: "💬", label: "Real-time chat" },
            { emoji: "📎", label: "Share images" },
            { emoji: "🟢", label: "See who's online" },
          ].map((feat, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-base-200/60"
              style={{
                border: "1px solid oklch(var(--b3)/0.6)",
              }}
            >
              <span style={{ fontSize: 18 }}>{feat.emoji}</span>
              <span className="text-xs text-base-content/45 leading-tight text-center">
                {feat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NoChatSelected

// import { MessageSquare } from 'lucide-react'
// import React from 'react'

// const NoChatSelected = () => {
//   return (
//     <div>
//         <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
//       <div className="max-w-md text-center space-y-6">
//         {/* Icon Display */}
//         <div className="flex justify-center gap-4 mb-4">
//           <div className="relative">
//             <div
//               className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
//              justify-center animate-bounce"
//             >
//               <MessageSquare className="w-8 h-8 text-primary " />
//             </div>
//           </div>
//         </div>

//         {/* Welcome Text */}
//         <h2 className="text-2xl font-bold">Welcome to HYEE!</h2>
//         <p className="text-base-content/60">
//           Select a conversation from the sidebar to start chatting
//         </p>
//       </div>
//     </div>
//     </div>
//   )
// }

// export default NoChatSelected