import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { CookieConsent } from "@/components/CookieConsent";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import { Home } from "./pages/Home";
import Supplements from "./pages/Supplements";
import { Shop } from "./pages/Shop";
import { Mission } from "./pages/Mission";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { TermsOfService } from "./pages/TermsOfService";
import { Disclaimer } from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";
import { ProductDetail } from "./pages/ProductDetail";
import { WellnessHub } from "./pages/WellnessHub";
import { CityLanding } from "./pages/CityLanding";
import { GeoRedirectBanner } from "./components/GeoRedirectBanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="relative min-h-screen bg-background">
          <Header />
          <GeoRedirectBanner />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/supplements" element={<Supplements />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:handle" element={<ProductDetail />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/wellness" element={<WellnessHub />} />
            <Route path="/wellness/:city" element={<CityLanding />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
          <NewsletterPopup />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
