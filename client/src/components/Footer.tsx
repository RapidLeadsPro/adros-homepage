import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#080d18]">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#39FF14] to-cyan-500 flex items-center justify-center">
                <span className="text-black font-bold text-xs">A</span>
              </div>
              <span className="font-bold text-base tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                ADROS
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Your AI marketing department. Research, strategy, creative, deployment — all automated.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Product</h4>
            <ul className="space-y-3">
              <li><Link href="/#how-it-works" className="text-sm text-gray-500 hover:text-white transition-colors">How It Works</Link></li>
              <li><Link href="/#capabilities" className="text-sm text-gray-500 hover:text-white transition-colors">Capabilities</Link></li>
              <li><Link href="/pricing" className="text-sm text-gray-500 hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Company</h4>
            <ul className="space-y-3">
              <li><a href="mailto:hello@adros.ai" className="text-sm text-gray-500 hover:text-white transition-colors">Contact</a></li>
              <li><a href="https://app.adros.ai" className="text-sm text-gray-500 hover:text-white transition-colors">Sign In</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Legal</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-500 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {currentYear} Adros AI. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            22 Sin Ming Lane #06-76 Midview City, Singapore 573969
          </p>
        </div>
      </div>
    </footer>
  );
}
