
import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);
  const widths = ["65%", "72%", "50%", "68%", "58%", "75%", "48%", "62%"];
  const subWidths = ["38%", "28%", "44%", "32%", "40%", "25%", "36%", "30%"];
  const hasDot = [true, false, true, false, false, true, false, false];

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">

      {/* Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 opacity-40" />
          <span className="font-semibold text-xs tracking-widest uppercase opacity-30 hidden lg:block">
            Contacts
          </span>
        </div>
      </div>

      {/* Search ghost */}
      <div className="hidden lg:block px-3.5 pt-3 pb-1">
        <div className="skeleton h-9 w-full rounded-xl opacity-60" />
      </div>

      {/* Section label ghost */}
      <div className="hidden lg:block px-4 pt-3 pb-1">
        <div className="skeleton h-2.5 w-20 rounded-full opacity-35" />
      </div>

      {/* Contact rows */}
      <div className="overflow-y-auto w-full flex-1 pb-2">
        {skeletonContacts.map((_, idx) => (
          <div
            key={idx}
            className="w-full px-3.5 py-2.5 flex items-center gap-3"
            style={{ opacity: 1 - idx * 0.08 }}
          >
            {/* Avatar + online dot */}
            <div className="relative shrink-0 mx-auto lg:mx-0">
              <div className="skeleton size-11 rounded-full" />
              {hasDot[idx] && (
                <span
                  className="absolute bottom-0.5 right-0.5 size-2.5 rounded-full bg-base-300 border-2 border-base-100"
                  style={{ animation: "pulse 2s infinite" }}
                />
              )}
            </div>

            {/* Text + timestamp */}
            <div className="hidden lg:flex flex-1 min-w-0 items-center justify-between gap-2">
              <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                <div
                  className="skeleton h-3 rounded-full"
                  style={{ width: widths[idx] }}
                />
                <div
                  className="skeleton h-2.5 rounded-full opacity-50"
                  style={{ width: subWidths[idx] }}
                />
              </div>
              <div className="skeleton h-2 w-7 rounded-full opacity-30 shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
// import { Users } from "lucide-react";

// const SidebarSkeleton = () => {
//   // Create 8 skeleton items
//   const skeletonContacts = Array(8).fill(null);

//   return (
//     <aside
//       className="h-full w-20 lg:w-72 border-r border-base-300 
//     flex flex-col transition-all duration-200"
//     >
//       {/* Header */}
//       <div className="border-b border-base-300 w-full p-5">
//         <div className="flex items-center gap-2">
//           <Users className="w-6 h-6" />
//           <span className="font-medium hidden lg:block">Contacts</span>
//         </div>
//       </div>

//       {/* Skeleton Contacts */}
//       <div className="overflow-y-auto w-full py-3">
//         {skeletonContacts.map((_, idx) => (
//           <div key={idx} className="w-full p-3 flex items-center gap-3">
//             {/* Avatar skeleton */}
//             <div className="relative mx-auto lg:mx-0">
//               <div className="skeleton size-12 rounded-full" />
//             </div>

//             {/* User info skeleton - only visible on larger screens */}
//             <div className="hidden lg:block text-left min-w-0 flex-1">
//               <div className="skeleton h-4 w-32 mb-2" />
//               <div className="skeleton h-3 w-16" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </aside>
//   );
// };

// export default SidebarSkeleton;