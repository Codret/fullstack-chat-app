
import React, { useState } from 'react'
import { useAuthStore } from '../src/store/useAuthStore'
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern'
import toast from 'react-hot-toast'

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  })
  const { signUp, isSigningUp } = useAuthStore()

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required")
    if (!formData.email.trim()) return toast.error("Email is required")
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format")
    if (!formData.password.trim()) return toast.error("Password is required")
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters")
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = validateForm()
    if (success === true) signUp(formData)
  }

  const passwordStrength = () => {
    const p = formData.password
    if (!p) return null
    if (p.length < 4) return { label: "Weak", color: "bg-error", width: "33%", text: "text-error" }
    if (p.length < 6) return { label: "Fair", color: "bg-warning", width: "66%", text: "text-warning" }
    return { label: "Strong", color: "bg-success", width: "100%", text: "text-success" }
  }

  const strength = passwordStrength()

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-base-100">

      {/* ── Left: Form panel ── */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 relative">

        {/* Ambient glow */}
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
                  style={{ boxShadow: "0 0 0 1px oklch(var(--p)/0.2)" }}
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
                Create account
              </h1>
              <p className="text-sm text-base-content/45 mt-1.5">
                Get started with your free account today
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

            {/* Full name */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold
                uppercase tracking-wider text-base-content/40 pl-1">
                <User className="size-3.5" strokeWidth={2} />
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="size-4 text-base-content/30" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 text-sm
                    focus:border-primary/50 focus:outline-none transition-colors duration-150"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-semibold
                uppercase tracking-wider text-base-content/40 pl-1">
                <Mail className="size-3.5" strokeWidth={2} />
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
              <label className="flex items-center gap-1.5 text-xs font-semibold
                uppercase tracking-wider text-base-content/40 pl-1">
                <Lock className="size-3.5" strokeWidth={2} />
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

              {/* Password strength bar */}
              {strength && (
                <div className="space-y-1 px-1">
                  <div className="h-1 w-full bg-base-300 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                      style={{ width: strength.width }}
                    />
                  </div>
                  <p className={`text-xs font-medium ${strength.text}`}>
                    {strength.label} password
                  </p>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSigningUp}
              className="btn btn-primary w-full gap-2 text-sm font-semibold
                transition-all duration-150 active:scale-[0.98]"
              style={{ letterSpacing: "-0.01em" }}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Creating account…
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          {/* ── Footer link ── */}
          <p className="text-center text-sm text-base-content/45">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-primary hover:text-primary/80
                underline underline-offset-2 transition-colors duration-150"
            >
              Sign in
            </Link>
          </p>

        </div>
      </div>

      {/* ── Right: decorative pattern ── */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments and stay in touch with your loved ones."
      />

    </div>
  )
}

export default SignUpPage


// import React, { useState } from 'react'
// import { useAuthStore } from '../src/store/useAuthStore';
// import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import AuthImagePattern from '../components/AuthImagePattern';
// import toast from 'react-hot-toast';

// const SignUpPage = () => {

//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: ""
//   });
//   const {signUp, isSigningUp} = useAuthStore();


//   const validateForm = () => {
//     if(!formData.fullName.trim()) return (toast.error("Full name is required")); 
//     if(!formData.email.trim()) return (toast.error("Email is required"));
//     if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid Email format");
//     if(!formData.password.trim()) return (toast.error("password is required"));
//     if(formData.password.length < 6) return (toast.error("password must be at least 6 character"));

//     return true;
//   }


//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const success  = validateForm();
//     if(success === true )  signUp(formData)
//   }

//   return (
//     <div className='min-h-screen grid lg:grid-cols-2'>
//       {/* left side of form */}
//       <div className='flex flex-col jistify-center items-center p-6 sm:p-18 mt-11 '>
//         <div className='w-full max-w-md space-y-8'>
//           {/* LOGO */}
//           <div className="text-center mb-8">
//             <div className='flex flex-col items-center gap-2 group'>

//               <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
//                 <MessageSquare className='size-10 text-primary'/>
//               </div>
//               <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
//               <p className='text-base-content/60'>Get started with your free account</p>
//             </div>
//           </div>
//           {/* LOGO END */}
//           <form  onSubmit={handleSubmit} className='space-y-6'>
//              <div className='form-control'>
//                 <label className='label'>
//                   <span className='label-text font-medium mb-0.4'>Full Name</span>
//                 </label>
//                 <div className='relative'>
//                   <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
//                     <User className='size-5 text-base-content/40'/>
//                   </div>
//                   <input
//                    type="text" 
//                    className={'input input-bordered w-full pl-10'}
//                    placeholder='John Doe'
//                    value={formData.fullName}
//                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
//                    />
//                 </div>
//              </div>


//              <div className='form-control'>
//                 <label className='label'>
//                   <span className='label-text font-medium mb-0.4'>Email</span>
//                 </label>
//                 <div className='relative'>
//                   <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
//                     <Mail className='size-5 text-base-content/40'/>
//                   </div>
//                   <input
//                    type="text" 
//                    className={'input input-bordered w-full pl-10'}
//                    placeholder='you@gmail.com'
//                    value={formData.email}
//                    onChange={(e) => setFormData({...formData, email: e.target.value})}
//                    />
//                 </div>
//              </div>


//              <div className='form-control'>
//                 <label className='label'>
//                   <span className='label-text font-medium mb-0.4'>Password</span>
//                 </label>
//                 <div className='relative'>
//                   <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
//                     <Lock className='size-5 text-base-content/40'/>
//                   </div>
//                   <input
//                    type={showPassword ? "text" : "password" }
//                    className={' input input-bordered w-full pl-10'}
//                    placeholder='...........'
//                    value={formData.password}
//                    onChange={(e) => setFormData({...formData, password: e.target.value})}
//                    />
//                    <button
//                    type='button'
//                    className='absolute inset-y-0 right-0 pr-3 flex items-center'
//                    onClick={() => setShowPassword(!showPassword)}
//                    >
//                     {showPassword ? (
//                       <EyeOff className='size-5 text-base-content/40'/>
//                     ) : (
//                       <Eye className='size-5 text-base-content/40'/>
//                     )}

//                    </button>
//                 </div>
//              </div>
            
//             <button
//             type='submit' className=' btn btn-primary w-full ' disabled = {isSigningUp}>
//               {isSigningUp ? (
//                 <>
//                   <Loader2 className='size-5 animate-spin'/>
//                   Loading...
//                 </>
//               ): (
//                   "Create Account"
//               )}
//             </button>

//           </form>

//         <div className='text-center'>
//           <p className='text-base-content/60'>
//             Already have an Account?{" "}
//           </p>
//           <Link to="/login" className='link link-primary'>
//               Sign in
//           </Link>
//         </div>

//         </div>
//       </div>

//       {/* right side  */}
      
//       <AuthImagePattern
//       title = "Join Our Community"
//       subtitle = "Connect with friends, share moments and stay touch with your loved ones"
//       />

//     </div>
//   )
// }

// export default SignUpPage