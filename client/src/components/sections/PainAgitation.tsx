export default function PainAgitation() {
  const painPoints = [
    "You're guessing which creative will work — and burning budget to find out",
    "Last month's winning ad stopped working and you don't know why",
    "You're paying $3K-$10K/month for an agency that runs the same playbook for everyone",
    "Every 'insight' you get is a dashboard you don't have time to read",
    "Nothing learns. Nothing compounds. You start from zero every single campaign",
  ];

  const solutions = [
    "A system that audits what's working and what's broken — automatically",
    "Ads built from patterns that have already won — not creative roulette",
    "Campaigns that deploy, monitor, and improve without you babysitting them",
    "A memory that logs every result and uses it to make next week better",
  ];

  return (
    <section className="py-20 bg-background" data-animate="section">
      <div className="container max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          You're Not Bad at Ads. You're Just Doing It Alone.
        </h2>

        <div className="mb-16">
          <p className="text-lg text-muted-foreground mb-8">
            You've watched the YouTube tutorials. You've boosted the posts. You've even hired that agency who promised "data-driven results" and delivered a $4,000 invoice with a PDF nobody asked for.
          </p>

          <p className="text-lg font-semibold mb-6">Here's what's actually happening:</p>

          <div className="space-y-4 mb-12">
            {painPoints.map((point, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <p className="text-foreground">{point}</p>
              </div>
            ))}
          </div>

          <div className="border-l-4 border-primary pl-6 py-4 bg-primary/5 rounded-xl">
            <p className="font-semibold mb-4">What you actually need:</p>
            <div className="space-y-3">
              {solutions.map((solution, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <p className="text-foreground">{solution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-xl font-semibold text-center text-primary">
          You don't need another tool. You need a marketing department that doesn't sleep, doesn't quit, and doesn't charge agency rates.
        </p>
      </div>
    </section>
  );
}
