export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Audit",
      description: "Adros scans your ad account weekly, finds what's working, flags what's broken, and compares your performance against real benchmarks.",
    },
    {
      number: "2",
      title: "Pattern-Match & Create",
      description: "AI matches your business context to 3,298 winning ad patterns — then generates 3 ad concepts (Safe, Standard, Bold) with copy, visuals, and hooks designed to stop the scroll.",
    },
    {
      number: "3",
      title: "Review & Approve",
      description: "You see exactly what the ad will look like. Say 'Launch #2' or 'Change the headline on #3.' Adros refines until you approve.",
    },
    {
      number: "4",
      title: "Deploy & Monitor",
      description: "Adros builds the campaign, ad set, and creative — then pushes it live to Meta or Google. Performance is tracked daily, compared against previous periods, zero babysitting required.",
    },
    {
      number: "5",
      title: "Learn & Repeat",
      description: "Every result is logged. What worked. What didn't. What to try next. Next week's audit is smarter than last week's — because Adros remembers everything.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-secondary/30" data-animate>
      <div className="container max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          From Audit to Deployed Ad in One Conversation
        </h2>
        <p className="text-center text-muted-foreground mb-16 text-lg">
          The complete loop that replaces your marketing team
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="bg-background rounded-lg p-6 border border-border hover:border-primary/50 transition-all hover:shadow-lg"
              data-animate
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold mb-4">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
