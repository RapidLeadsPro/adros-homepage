import { Database, Brain, Zap } from "lucide-react";

export default function WhyAdros() {
  const features = [
    {
      icon: Database,
      title: "3,298 Winning Ad Patterns",
      description: "Not templates. Real winning ads — scraped, analyzed, and distilled into creative patterns that actually convert. Every ad Adros creates is built on what's already worked.",
    },
    {
      icon: Brain,
      title: "AI That Learns Your Business",
      description: "Adros doesn't start from scratch every week. It remembers your audience, your offers, your past results — and uses that memory to get sharper with every campaign.",
    },
    {
      icon: Zap,
      title: "Create → Deploy → Monitor → Learn → Repeat",
      description: "Most tools stop at insights. Adros runs the full loop — from audit to deployed ad to performance log. It doesn't just tell you what to do. It does it.",
    },
  ];

  return (
    <section id="why-adros" className="py-20 bg-background" data-animate>
      <div className="container max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Other Tools Give You Data. Adros Takes Action.
        </h2>
        <p className="text-center text-muted-foreground mb-16 text-lg">
          Here's what makes Adros different
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="bg-secondary/30 rounded-lg p-8 border border-border hover:border-primary/50 transition-all" data-animate>
                <Icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-primary/20 rounded-lg p-8">
          <p className="text-lg italic text-foreground">
            "Pipeboard gives you a fishing rod. Adros gives you a fishing guide who fishes for you, logs every spot that worked, and comes back next week with better lures."
          </p>
        </div>
      </div>
    </section>
  );
}
