export default function SocialProof() {
  const stats = [
    { number: "3,298", label: "Winning Ad Patterns Analyzed" },
    { number: "Full Loop", label: "Creates → Deploys → Monitors" },
    { number: "Weekly", label: "AI Memory Gets Smarter Over Time" },
    { number: "100%", label: "Every Decision Backed by Data" },
  ];

  return (
    <section className="py-16 bg-secondary/40 border-y border-border" data-animate="section">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8" data-animate-stagger>
          {stats.map((stat, i) => (
            <div key={i} className="text-center" data-animate="item">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
