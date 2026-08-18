import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import CookieBanner from "@/components/CookieBanner";
import FloatingChatbot from "@/components/FloatingChatbot";

// Lazy load non-critical pages for better initial load performance
const Leistungen = lazy(() => import("@/pages/leistungen"));
const LeistungThema = lazy(() => import("@/pages/leistungen/thema"));
const FAQ = lazy(() => import("@/pages/faq"));
const Kontakt = lazy(() => import("@/pages/kontakt"));
const Impressum = lazy(() => import("@/pages/impressum"));
const Datenschutz = lazy(() => import("@/pages/datenschutz"));
const AGB = lazy(() => import("@/pages/agb"));
const EuAiAct = lazy(() => import("@/pages/eu-ai-act"));
const Ratgeber = lazy(() => import("@/pages/ratgeber"));
const CookiePage = lazy(() => import("@/pages/cookie"));
const UeberUns = lazy(() => import("@/pages/ueber-uns"));
const SofortHilfe = lazy(() => import("@/pages/sofort-hilfe"));
const Wasserschaden = lazy(() => import("@/pages/wasserschaden"));
const HeizungAusfall = lazy(() => import("@/pages/heizung-ausfall"));
const Barrierefreiheit = lazy(() => import("@/pages/barrierefreiheit"));
const SanierungReparatur = lazy(() => import("@/pages/sanierung-reparatur"));
const KomplettsanierungKosten = lazy(() => import("@/pages/komplettsanierung-kosten"));
const WaermepumpePhotovoltaik = lazy(() => import("@/pages/waermepumpe-photovoltaik"));
import Pricing from "@/pages/pricing";
const DistrictLandingPage = lazy(() => import("@/pages/district"));

// Loading fallback for lazy-loaded pages
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded">Zum Inhalt springen</a>
      <div className="animate-pulse text-muted-foreground">Laden...</div>
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/leistungen" component={Leistungen} />
        <Route path="/leistungen/:slug" component={LeistungThema} />
        <Route path="/ratgeber" component={Ratgeber} />
        <Route path="/faq" component={FAQ} />
        <Route path="/preise" component={Pricing} />
        <Route path="/kontakt" component={Kontakt} />
        <Route path="/impressum" component={Impressum} />
        <Route path="/datenschutz" component={Datenschutz} />
        <Route path="/agb" component={AGB} />
        <Route path="/eu-ai-act" component={EuAiAct} />
        <Route path="/cookie" component={CookiePage} />
        <Route path="/ueber-uns" component={UeberUns} />
        <Route path="/sofort-hilfe" component={SofortHilfe} />
        <Route path="/wasserschaden" component={Wasserschaden} />
        <Route path="/heizung-ausfall" component={HeizungAusfall} />
        <Route path="/barrierefreiheit" component={Barrierefreiheit} />
        <Route path="/sanierung-reparatur" component={SanierungReparatur} />
        <Route path="/komplettsanierung-kosten" component={KomplettsanierungKosten} />
        <Route path="/waermepumpe-photovoltaik" component={WaermepumpePhotovoltaik} />
        <Route path="/bezirk/:slug" component={DistrictLandingPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <CookieBanner />
        <FloatingChatbot />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
