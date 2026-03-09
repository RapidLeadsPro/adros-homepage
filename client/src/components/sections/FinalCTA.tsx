import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    
    // Simulate API call - in production, this would send to your backend
    setTimeout(() => {
      toast.success("You're on the waitlist! Check your email for confirmation.");
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <section id="final-cta" className="py-20 bg-gradient-to-b from-background to-secondary/30" data-animate>
      <div className="container max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Every Week Without Adros Is Another Week of Guessing
        </h2>

        <p className="text-center text-lg text-muted-foreground mb-12">
          Join the waitlist now and be first in line when we launch. Early access members get founding pricing and direct input on the features we build.
        </p>

        <form onSubmit={handleSubmit} className="bg-secondary/30 border border-border rounded-lg p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              disabled={loading}
            />
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 font-semibold whitespace-nowrap"
            >
              {loading ? "Joining..." : "Get Early Access"}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            No credit card. No commitment. Just early access to the AI that's about to change how you run ads.
          </p>
        </form>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Questions? Email us at <a href="mailto:hello@adros.ai" className="text-primary hover:underline">hello@adros.ai</a>
          </p>
        </div>
      </div>
    </section>
  );
}
