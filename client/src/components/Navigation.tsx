import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0c1220]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#39FF14] to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
            <span className="text-black font-bold text-sm">A</span>
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            ADROS
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection("capabilities")}
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Capabilities
          </button>
          <Link
            href="/pricing"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Pricing
          </Link>
          <a
            href="https://app.adros.ai"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Sign In
          </a>
          <Button
            asChild
            className="bg-gradient-to-r from-[#39FF14] to-cyan-500 hover:from-[#50FF30] hover:to-cyan-400 text-black font-semibold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all"
          >
            <a href="https://app.adros.ai">Get Started</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#0c1220]/95 backdrop-blur-xl">
          <div className="container py-6 flex flex-col gap-4">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors text-left py-2"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("capabilities")}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors text-left py-2"
            >
              Capabilities
            </button>
            <Link
              href="/pricing"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <a
              href="https://app.adros.ai"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors py-2"
            >
              Sign In
            </a>
            <Button
              asChild
              className="w-full bg-gradient-to-r from-[#39FF14] to-cyan-500 hover:from-[#50FF30] hover:to-cyan-400 text-black font-semibold mt-2"
            >
              <a href="https://app.adros.ai">Get Started</a>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
