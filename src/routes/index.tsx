import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Services from "@/components/portfolio/Services";
import Projects from "@/components/portfolio/Projects";
import Process from "@/components/portfolio/Process";
import ToolsAndDiff from "@/components/portfolio/ToolsAndDiff";
import CTA from "@/components/portfolio/CTA";
import Footer from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Process />
        <ToolsAndDiff />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
