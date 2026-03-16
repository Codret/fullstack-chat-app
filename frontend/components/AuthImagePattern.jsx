import React from 'react';

const AuthImagePattern = ({ title, subtitle }) => {
    const tiles = [...Array(9)];

    const tileStyles = [
        // top-left: large soft blob
        { borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%", animationDelay: "0s" },
        // top-mid: tall pill
        { borderRadius: "12px", animationDelay: "0.4s" },
        // top-right: circle
        { borderRadius: "50%", animationDelay: "0.8s" },
        // mid-left: diamond-ish
        { borderRadius: "30% 70% 70% 30% / 60% 40% 60% 40%", animationDelay: "0.6s" },
        // center: large rounded square — accent
        { borderRadius: "24px", animationDelay: "0.2s", accent: true },
        // mid-right: blob
        { borderRadius: "70% 30% 40% 60% / 40% 55% 45% 60%", animationDelay: "1s" },
        // bot-left: circle
        { borderRadius: "50%", animationDelay: "0.9s" },
        // bot-mid: rounded square
        { borderRadius: "18px", animationDelay: "0.3s" },
        // bot-right: blob
        { borderRadius: "45% 55% 60% 40% / 55% 45% 55% 45%", animationDelay: "0.7s" },
    ];

    return (
        <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 relative overflow-hidden">

            {/* Background ambient glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(var(--p)/0.08) 0%, transparent 70%)",
                }}
            />

            <div className="max-w-sm w-full text-center relative z-10">

                {/* ── Tile grid ── */}
                <div className="grid grid-cols-3 gap-3 mb-10">
                    {tiles.map((_, i) => {
                        const style = tileStyles[i];
                        const isPulsing = i % 2 === 0;

                        return (
                            <div
                                key={i}
                                className={`aspect-square ${isPulsing ? "animate-pulse" : ""}`}
                                style={{
                                    borderRadius: style.borderRadius,
                                    animationDelay: style.animationDelay,
                                    animationDuration: "2.8s",
                                    background: style.accent
                                        ? "oklch(var(--p)/0.25)"
                                        : i % 3 === 0
                                            ? "oklch(var(--p)/0.12)"
                                            : "oklch(var(--p)/0.07)",
                                    boxShadow: style.accent
                                        ? "0 0 0 1px oklch(var(--p)/0.25), 0 8px 24px oklch(var(--p)/0.15)"
                                        : "0 0 0 1px oklch(var(--p)/0.10)",
                                    transition: "transform 0.3s ease",
                                }}
                                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
                                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                            />
                        );
                    })}
                </div>

                {/* ── Divider ── */}
                <div
                    className="mx-auto mb-6"
                    style={{
                        width: 36,
                        height: 3,
                        borderRadius: 999,
                        background: "oklch(var(--p)/0.35)",
                    }}
                />

                {/* ── Text ── */}
                <h2
                    className="font-bold mb-3"
                    style={{ fontSize: "1.45rem", lineHeight: 1.3, letterSpacing: "-0.02em" }}
                >
                    {title}
                </h2>
                <p
                    className="text-base-content/55 leading-relaxed"
                    style={{ fontSize: "0.9rem" }}
                >
                    {subtitle}
                </p>
            </div>
        </div>
    );
};

export default AuthImagePattern;

// import React from 'react'

// const AuthImagePattern = ({title, subtitle}) => {
//   return (
//     <div className='hidden lg:flex items-center justify-center bg-base-200 p-12'>
//         <div className='max-w-md text-center'>
//             <div className='grid grid-cols-3 gap-3 mb-8'>
//                 {[...Array(9)].map((_, i) => (
//                     <div
//                         key = {i}
//                         className={`aspect-square rounded-2xl bg-primary/10 ${
//                             i % 2 === 0 ? "animate-pulse" : ""
//                         }`}
//                     >
//                     </div>
//                 ))}
//             </div>
//             <h2 className='text-2xl font-bold mb-4'>{title}</h2>
//             <p className='text-base-content/60'>{subtitle} </p>
//         </div>
//     </div>
//   )
// }

// export default AuthImagePattern