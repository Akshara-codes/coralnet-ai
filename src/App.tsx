import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Modules from "./pages/Modules";
import Visualization from "./pages/Visualization";
import OceanBackground from "./components/OceanBackground";
import Navbar from "./components/Navbar";
import ChatbotOctopus from "./components/ChatbotOctopus";

// Create a global function to open chatbot
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
        <OceanBackground />
        <Navbar />
        <div className="pt-20">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/visualization" element={<Visualization />} />
            <Route path="/modules" element={<Modules />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <ChatbotOctopus />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
