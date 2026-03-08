import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Modules from "./pages/Modules";
import Visualization from "./pages/Visualization";
import OceanBackground from "./components/OceanBackground";
import Navbar from "./components/Navbar";
import ChatbotOctopus from "./components/ChatbotOctopus";

declare global {
  interface Window {
    openChatbot: () => void;
  }
}

window.openChatbot = () => {
  const event = new CustomEvent('openChatbot');
  window.dispatchEvent(event);
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <OceanBackground />
          <Navbar />
          <div className="pt-20">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/visualization" element={<Visualization />} />
              <Route path="/modules" element={<Modules />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <ChatbotOctopus />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
