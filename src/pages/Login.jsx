// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Brain, Mail, Lock, Eye, EyeOff } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // Simulate loading, then navigate
//     setTimeout(() => {
//       setIsLoading(false);
//       navigate("/appointments");
//     }, 800);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background p-4">
//       {/* Subtle background pattern */}
//       <div className="absolute inset-0 gradient-subtle opacity-50" />

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         className="relative w-full max-w-md"
//       >
//         {/* Login Card */}
//         <div className="card-elevated p-8 space-y-8">
//           {/* Logo & Header */}
//           <div className="text-center space-y-3">
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ delay: 0.1, duration: 0.4 }}
//               className="flex justify-center"
//             >
//               <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20">
//                 <Brain className="h-7 w-7 text-primary" />
//               </div>
//             </motion.div>

//             <div>
//               <h1 className="text-2xl font-semibold text-foreground">
//                 Welcome to NeuroFlow
//               </h1>
//               <p className="text-sm text-muted-foreground mt-1.5">
//                 Sign in to access your dashboard
//               </p>
//             </div>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div className="space-y-4">
//               {/* Email */}
//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-sm font-medium">
//                   Email address
//                 </Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="name@company.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="pl-10 h-11 bg-muted/30 border-border/60 focus:bg-card"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div className="space-y-2">
//                 <Label htmlFor="password" className="text-sm font-medium">
//                   Password
//                 </Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="pl-10 pr-10 h-11 bg-muted/30 border-border/60 focus:bg-card"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
//                   >
//                     {showPassword ? (
//                       <EyeOff className="h-4 w-4" />
//                     ) : (
//                       <Eye className="h-4 w-4" />
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Remember & Forgot */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id="remember"
//                   checked={rememberMe}
//                   onCheckedChange={(checked) => setRememberMe(checked)}
//                 />
//                 <Label
//                   htmlFor="remember"
//                   className="text-sm text-muted-foreground cursor-pointer"
//                 >
//                   Remember me
//                 </Label>
//               </div>
//               <button
//                 type="button"
//                 className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
//               >
//                 Forgot password?
//               </button>
//             </div>

//             {/* Submit Button */}
//             <Button
//               type="submit"
//               className="w-full h-11 font-medium"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//                   className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
//                 />
//               ) : (
//                 "Sign in"
//               )}
//             </Button>
//           </form>

//           {/* Divider */}
//           <div className="relative">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-border" />
//             </div>
//             <div className="relative flex justify-center text-xs">
//               <span className="bg-card px-3 text-muted-foreground">
//                 Demo credentials: any email & password
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <p className="text-center text-xs text-muted-foreground mt-6">
//           © 2024 NeuroFlow. All rights reserved.
//         </p>
//       </motion.div>
//     </div>
//   );
// }









import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading, then navigate
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-accent/10 p-2 border border-accent/20">
              <Brain className="h-6 w-6 text-accent" />
            </div>
            <div className="text-center">
              <h1 className="text-xl font-semibold text-foreground">NeuroFlow</h1>
              <p className="text-xs text-muted-foreground/80 mt-0.5">Clinical Dashboard</p>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground">Sign in</h2>
            <p className="text-sm text-muted-foreground/80 mt-1">
              Enter your credentials to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@neuroflow.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 rounded-lg border-border/40 focus:border-accent/50"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 rounded-lg border-border/40 focus:border-accent/50"
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 rounded-lg bg-accent hover:bg-accent/90 transition-colors mt-2"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          {/* Demo Note */}
          <div className="mt-6 pt-6 border-t border-border/30">
            <p className="text-xs text-center text-muted-foreground/80">
              Demo: Use any email and password
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground/80 mt-6">
          © {new Date().getFullYear()} NeuroFlow Clinical
        </p>
      </motion.div>
    </div>
  );
}