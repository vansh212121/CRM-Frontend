import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Appointments from "./pages/Appointments";
import Centers from "./pages/Centers";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import { Provider } from "react-redux";
import { appStore } from "./redux/store";
import PersistLogin from "./components/auth/PersistLogin";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App = () => (
  <Provider store={appStore}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route element={<PersistLogin />}>
            <Route element={<ProtectedRoute />}>
              <Route
                path="/"
                element={<Navigate to="/appointments" replace />}
              />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/centers" element={<Centers />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </Provider>
);

export default App;
