import { motion } from "framer-motion";
import { AppSidebar } from "./AppSidebar";

export function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
        className="ml-60 min-h-screen"
      >
        <div className="p-6 lg:p-8">{children}</div>
      </motion.main>
    </div>
  );
}
