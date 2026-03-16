
import React, { useState } from 'react'
import { useAuthStore } from '../src/store/useAuthStore'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from 'lucide-react'
import AuthImagePattern from '../components/AuthImagePattern'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const { login, isLoggingIn } = useAuthStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(formData)
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-base-100">

      {/* ── Left: Form panel ── */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative">

        {/* Subtle background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% -10%, oklch(var(--p)/0.07) 0%, transparent 70%)",
          }}
        />

        <div className="w-full max-w-md space-y-7 relative z-10">

          {/* ── Logo + heading ── */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="relative group">
                {/* Ping ring */}
                <div
                  className="absolute inset-0 rounded-2xl animate-ping"
                  style={{
                    background: "oklch(var(--p)/0.10)",
                    animationDuration: "3s",
                  }}
                />
                <div
                  className="relative size-14 rounded-2xl flex items-center justify-center
                    bg-primary/10 group-hover:bg-primary/18 transition-colors duration-200"
                  style={{
                    boxShadow: "0 0 0 1px oklch(var(--p)/0.2)",
                  }}
                >
                  <MessageSquare className="size-7 text-primary" strokeWidth={1.8} />
                </div>
              </div>
            </div>

            <div>
              <h1
                className="text-2xl font-bold"
                style={{ letterSpacing: "-0.03em", lineHeight: 1.2 }}
              >
                Welcome back
              </h1>
              <p className="text-sm text-base-content/45 mt-1.5">
                Sign in to continue your conversations
              </p>
            </div>
          </div>

          {/* ── Divider ── */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-base-300" />
            <div
              className="size-1.5 rounded-full"
              style={{ background: "oklch(var(--p)/0.35)" }}
            />
            <div className="flex-1 h-px bg-base-300" />
          </div>

          {/* ── Form ── */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-base-content/55 uppercase tracking-wider pl-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="size-4 text-base-content/30" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 text-sm
                    focus:border-primary/50 focus:outline-none transition-colors duration-150"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-base-content/55 uppercase tracking-wider pl-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="size-4 text-base-content/30" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 pr-11 text-sm
                    focus:border-primary/50 focus:outline-none transition-colors duration-150"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center
                    text-base-content/30 hover:text-base-content/60
                    transition-colors duration-150"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword
                    ? <EyeOff className="size-4" />
                    : <Eye className="size-4" />
                  }
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="btn btn-primary w-full gap-2 text-sm font-semibold
                transition-all duration-150 active:scale-[0.98]"
              style={{ letterSpacing: "-0.01em" }}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* ── Footer link ── */}
          <p className="text-center text-sm text-base-content/45">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-primary hover:text-primary/80
                underline underline-offset-2 transition-colors duration-150"
            >
              Create account
            </Link>
          </p>

        </div>
      </div>

      {/* ── Right: decorative pattern ── */}
      <AuthImagePattern
        title="Welcome back!"
        subtitle="Sign in to continue your conversations and catch up with your messages."
      />

    </div>
  )
}

export default LoginPage


// import React, { useState } from 'react'
// import { useAuthStore } from '../src/store/useAuthStore';
// import { Link } from 'react-router-dom';
// import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from 'lucide-react';
// import AuthImagePattern from '../components/AuthImagePattern';


// const LoginPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//     const [formData, setFormData] = useState({
//       email: "",
//       password: ""
//     });

//     const {login, isLoggingIn} = useAuthStore();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     login(formData);
//   }
//   return (
//      <div className="h-screen grid lg:grid-cols-2">
//       {/* Left Side - Form */}
//       <div className="flex flex-col justify-center items-center p-6 sm:p-12">
//         <div className="w-full max-w-md space-y-8">
//           {/* Logo */}
//           <div className="text-center mb-8">
//             <div className="flex flex-col items-center gap-2 group">
//               <div
//                 className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
//               transition-colors"
//               >
//                 <MessageSquare className="w-6 h-6 text-primary" />
//               </div>
//               <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
//               <p className="text-base-content/60">Sign in to your account</p>
//             </div>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6" >
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Email</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type="email"
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="you@example.com"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 />
//               </div>
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Password</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="••••••••"
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5 text-base-content/40" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-base-content/40" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
//               {isLoggingIn ? (
//                 <>
//                   <Loader2 className="h-5 w-5 animate-spin" />
//                   Loading...
//                 </>
//               ) : (
//                 "Sign in"
//               )}
//             </button>
//           </form>

//           <div className="text-center">
//             <p className="text-base-content/60">
//               Don&apos;t have an account?{" "}
//               <Link to="/signup" className="link link-primary">
//                 Create account
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Image/Pattern */}
//       <AuthImagePattern
//         title={"Welcome back!"}
//         subtitle={"Sign in to continue your conversations and catch up with your messages."}
//       />
//     </div>
//   )
// }

// export default LoginPage