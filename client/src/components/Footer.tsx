import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/20 border-t border-border py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left - Copyright */}
          <div>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Adros AI. All rights reserved.
            </p>
          </div>

          {/* Center - Links */}
          <div className="flex justify-center gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <span className="text-muted-foreground">·</span>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>

          {/* Right - Contact */}
          <div className="text-right">
            <p className="text-sm text-muted-foreground">
              Questions?{" "}
              <a href="mailto:hello@adros.ai" className="text-primary hover:underline">
                hello@adros.ai
              </a>
            </p>
          </div>
        </div>

        {/* Company Info */}
        <div className="border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p className="mb-2">Adros AI</p>
          <p>22 Sin Ming Lane #06-76 Midview City, Singapore 573969</p>
        </div>
      </div>
    </footer>
  );
}
