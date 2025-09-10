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
import OceanBackground from "./components/OceanBackground";
import Navbar from "./components/Navbar";
import ChatbotOctopus from "./components/ChatbotOctopus";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <OceanBackground />
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/visualization" element={<div className="pt-32 px-6 text-center"><h1 className="text-3xl text-gradient-aqua">Visualization Dashboard - Coming Soon</h1></div>} />
          <Route path="/modules" element={<div className="pt-32 px-6 text-center"><h1 className="text-3xl text-gradient-aqua">Research Modules - Coming Soon</h1></div>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatbotOctopus />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
