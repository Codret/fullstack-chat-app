
import React, { useState } from 'react'
import { useAuthStore } from '../src/store/useAuthStore'
import { Camera, Mail, User, Shield, Calendar } from 'lucide-react'

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore()
  const [selectedImg, setSelectedImg] = useState(null)

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async () => {
      const base64Image = reader.result
      setSelectedImg(base64Image)
      await updateProfile({ profilePic: base64Image })
    }
  }

  return (
    <div className="min-h-screen bg-base-200 pt-20 pb-10 relative">

      {/* ── Ambient glow ── */}
      <div
        className="fixed inset-0 pointer-events-none -z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 0%, oklch(var(--p)/0.06) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-xl mx-auto px-4">

        {/* ── Page heading ── */}
        <div className="mb-6 text-center">
          <h1
            className="text-2xl font-bold"
            style={{ letterSpacing: "-0.03em" }}
          >
            Your Profile
          </h1>
          <p className="text-sm text-base-content/40 mt-1">
            Manage your personal information
          </p>
        </div>

        {/* ── Main card ── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "oklch(var(--b1))",
            boxShadow:
              "0 0 0 1px oklch(var(--b3)/0.8), 0 20px 48px -12px oklch(var(--b3)/0.5)",
          }}
        >

          {/* ── Hero banner ── */}
          <div
            className="h-24 w-full relative"
            style={{
              background:
                "linear-gradient(135deg, oklch(var(--p)/0.25) 0%, oklch(var(--p)/0.08) 100%)",
            }}
          >
            {/* Decorative dots */}
            {[
              { top: 12, left: 24, size: 48, opacity: 0.08 },
              { top: -8, right: 40, size: 72, opacity: 0.06 },
              { bottom: -10, right: 80, size: 36, opacity: 0.10 },
            ].map((d, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: d.size, height: d.size,
                  top: d.top, left: d.left,
                  right: d.right, bottom: d.bottom,
                  background: `oklch(var(--p)/${d.opacity})`,
                }}
              />
            ))}
          </div>

          {/* ── Avatar ── */}
          <div className="px-6 pb-6">
            <div className="flex flex-col items-center -mt-14 mb-6">
              <div className="relative">
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="size-28 rounded-full object-cover"
                  style={{
                    border: "4px solid oklch(var(--b1))",
                    boxShadow: "0 0 0 1px oklch(var(--p)/0.2), 0 8px 24px oklch(var(--b3)/0.5)",
                  }}
                />

                {/* Upload button */}
                <label
                  htmlFor="avatar-upload"
                  className={`absolute bottom-1 right-1 size-8 rounded-full
                    flex items-center justify-center cursor-pointer
                    bg-primary text-primary-content
                    hover:brightness-110 transition-all duration-200 active:scale-90
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none opacity-70" : ""}
                  `}
                  style={{
                    boxShadow: "0 2px 8px oklch(var(--p)/0.4)",
                  }}
                >
                  <Camera className="size-4" strokeWidth={2} />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>

              {/* Upload hint */}
              <p className="text-xs text-base-content/35 mt-3 text-center">
                {isUpdatingProfile
                  ? "Uploading photo…"
                  : "Click the camera to update your photo"
                }
              </p>

              {/* Name + email under avatar */}
              <h2
                className="text-lg font-bold mt-2"
                style={{ letterSpacing: "-0.02em" }}
              >
                {authUser?.fullName}
              </h2>
              <p className="text-sm text-base-content/40">{authUser?.email}</p>
            </div>

            {/* ── Divider ── */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-base-300" />
              <div
                className="size-1.5 rounded-full"
                style={{ background: "oklch(var(--p)/0.35)" }}
              />
              <div className="flex-1 h-px bg-base-300" />
            </div>

            {/* ── Info fields ── */}
            <div className="space-y-4">

              {/* Full name field */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-semibold
                  uppercase tracking-wider text-base-content/40 pl-1">
                  <User className="size-3.5" strokeWidth={2} />
                  Full Name
                </label>
                <div
                  className="flex items-center px-4 py-3 rounded-xl text-sm
                    bg-base-200 border border-base-300 text-base-content"
                >
                  {authUser?.fullName}
                </div>
              </div>

              {/* Email field */}
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-semibold
                  uppercase tracking-wider text-base-content/40 pl-1">
                  <Mail className="size-3.5" strokeWidth={2} />
                  Email Address
                </label>
                <div
                  className="flex items-center px-4 py-3 rounded-xl text-sm
                    bg-base-200 border border-base-300 text-base-content"
                >
                  {authUser?.email}
                </div>
              </div>
            </div>

            {/* ── Divider ── */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-base-300" />
              <div
                className="size-1.5 rounded-full"
                style={{ background: "oklch(var(--p)/0.35)" }}
              />
              <div className="flex-1 h-px bg-base-300" />
            </div>

            {/* ── Account info ── */}
            <div>
              <h3
                className="text-xs font-semibold uppercase tracking-wider
                  text-base-content/40 mb-4 pl-1"
              >
                Account Information
              </h3>

              <div className="space-y-2">

                {/* Member since */}
                <div
                  className="flex items-center justify-between px-4 py-3
                    rounded-xl bg-base-200 border border-base-300"
                >
                  <div className="flex items-center gap-2.5 text-sm text-base-content/60">
                    <Calendar className="size-4 text-base-content/30" strokeWidth={2} />
                    Member since
                  </div>
                  <span className="text-sm font-medium text-base-content">
                    {authUser.createdAt?.split("T")[0]}
                  </span>
                </div>

                {/* Account status */}
                <div
                  className="flex items-center justify-between px-4 py-3
                    rounded-xl bg-base-200 border border-base-300"
                >
                  <div className="flex items-center gap-2.5 text-sm text-base-content/60">
                    <Shield className="size-4 text-base-content/30" strokeWidth={2} />
                    Account status
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-semibold
                      px-2.5 py-1 rounded-full bg-success/10 text-success"
                  >
                    <span className="size-1.5 rounded-full bg-success inline-block" />
                    Active
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

// import React, { useState } from 'react'
// import { useAuthStore } from '../src/store/useAuthStore'
// import { Camera, Mail, User } from 'lucide-react';
// // import sharp from "sharp"

// const ProfilePage = () => {
//     const { authUser, isUpdatingProfile, updateProfile} = useAuthStore()
//     const [selectedImg, setSelectedImg] = useState(null);
  
//     const handleImageUpload = async (e) => {
//       const file = e.target.files[0];
//       if(!file) return;

//       const reader = new FileReader();
//       reader.readAsDataURL(file);



//       reader.onload = async () => {
//         const base64Image =  reader.result;
//         setSelectedImg(base64Image);
//         await updateProfile({profilePic: base64Image});
//       }
//     };
//   return (
//     <div className='h-screen pt-20'>
//       <div className='max-w-2xl mx-auto p-4 py-8'>
//         <div className='bg-base-300 rounded-xl p-6 space-y-8'>
//             <div className='text-center'>
//               <h1 className='text-2xl font-semibold'>Profile</h1>
//               <p className='mt-2 '>Your Profile Information</p>
//             </div>
//         {/* Avatar upload section */}
        
//             <div className="flex flex-col items-center gap-4">
//             <div className="relative">
//               <img
//                 src={selectedImg || authUser.profilePic || "/avatar.png"}
//                 alt="Profile"
//                 className="size-32 rounded-full object-cover border-4 "
//               />
//               <label
//                 htmlFor="avatar-upload"
//                 className={`
//                   absolute bottom-0 right-0 
//                   bg-base-content hover:scale-105
//                   p-2 rounded-full cursor-pointer 
//                   transition-all duration-200
//                   ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
//                 `}
//               >
//                 <Camera className="w-5 h-5 text-base-200" />
//                 <input
//                   type="file"
//                   id="avatar-upload"
//                   className="hidden"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   disabled={isUpdatingProfile}
//                 />
//               </label>
//             </div>
//             <p className="text-sm text-zinc-400">
//               {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
//             </p>
//           </div>
          
//           {/* user info section  */}

//           <div className="space-y-6">
//             <div className="space-y-1.5">
//               <div className="text-sm text-zinc-400 flex items-center gap-2">
//                 <User className="w-4 h-4" />
//                 Full Name
//               </div>
//               <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
//             </div>

//             <div className="space-y-1.5">
//               <div className="text-sm text-zinc-400 flex items-center gap-2">
//                 <Mail className="w-4 h-4" />
//                 Email Address
//               </div>
//               <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
//             </div>
//           </div>
        
//           {/* additional detail information of users  */}

//           <div className="mt-6 bg-base-300 rounded-xl p-6">
//             <h2 className="text-lg font-medium  mb-4">Account Information</h2>
//             <div className="space-y-3 text-sm">
//               <div className="flex items-center justify-between py-2 border-b border-zinc-700">
//                 <span>Member Since</span>
//                 <span>{authUser.createdAt?.split("T")[0]}</span>
//               </div>
//               <div className="flex items-center justify-between py-2">
//                 <span>Account Status</span>
//                 <span className="text-green-500">Active</span>
//               </div>
//             </div>
//           </div>
//         </div>
        
//       </div>

//     </div>
//   )
// }

// export default ProfilePage