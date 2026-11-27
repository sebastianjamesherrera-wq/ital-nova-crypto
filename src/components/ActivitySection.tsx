import { useEffect, useState } from "react";
import { ArrowUpRight, CheckCircle2, Globe2 } from "lucide-react";
import type { TranslationCopy } from "@/lib/i18n";

export interface ActivityItem {
  id: number;
  name: string;
  action: string;
  amount: string;
  region: "US" | "IT";
}

export const ACTIVITY_ITEMS: ActivityItem[] = [
  { id: 1, name: "Michael Johnson", action: "just earned a payout of", amount: "€22,045.80", region: "US" },
  { id: 2, name: "Alessandro Romano", action: "completed a trade of", amount: "€11,200", region: "IT" },
  { id: 3, name: "Sophia Williams", action: "received a withdrawal of", amount: "€10,806.40", region: "US" },
  { id: 4, name: "Lorenzo Ferrari", action: "recorded a profit of", amount: "€5,530.25", region: "IT" },
  { id: 5, name: "James Anderson", action: "completed a transaction of", amount: "€70,050", region: "US" },
  { id: 6, name: "Giulia Moretti", action: "just earned", amount: "€8,450.60", region: "IT" },
  { id: 7, name: "Christopher Davis", action: "completed a trade of", amount: "€15,750", region: "US" },
  { id: 8, name: "Matteo Ricci", action: "received a payout of", amount: "€12,300.90", region: "IT" },
  { id: 9, name: "Emily Thompson", action: "recorded a profit of", amount: "$6,825.40", region: "US" },
  { id: 10, name: "Leonardo Bianchi", action: "completed a transaction of", amount: "€25,000", region: "IT" },
];

const ROTATION_MS = 4000;

function useActivityRotation(count: number, intervalMs = ROTATION_MS) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % count);
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [count, intervalMs]);

  return index;
}

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ActivitySection({ t, isRtl }: { t: TranslationCopy; isRtl: boolean }) {
  const index = useActivityRotation(ACTIVITY_ITEMS.length);
  const current = ACTIVITY_ITEMS[index] ?? ACTIVITY_ITEMS[0]!;
  const total = ACTIVITY_ITEMS.length;

  return (
    <section id="activity" className="border-t border-border bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t.activity.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              {t.activity.subtitle}
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-positive/35 bg-positive/10 px-3.5 py-1.5 text-xs font-medium text-positive">
            <span className="h-2 w-2 animate-pulse rounded-full bg-positive" />
            {t.activity.liveStream}
          </span>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-3xl border border-border/70 bg-card/30 px-4 py-7 sm:px-8 sm:py-10">
          <div className="pointer-events-none absolute -top-28 left-1/2 h-64 w-[34rem] max-w-full -translate-x-1/2 rounded-full bg-positive/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-40 w-40 rounded-full bg-electric/10 blur-3xl" />

          <div className="relative min-h-[210px] sm:min-h-[200px]">
            <article
              key={current.id}
              className={`glass-panel glow-positive mx-auto w-full max-w-2xl rounded-2xl border-positive/40 p-4 sm:p-6 ${
                isRtl ? "animate-activity-pop-rtl" : "animate-activity-pop"
              }`}
            >
              <div className="animate-activity-float">
                <div className="flex items-start gap-3 sm:gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-positive/40 bg-positive/15 font-display text-sm font-bold text-positive sm:h-12 sm:w-12 sm:text-base">
                    {initialsOf(current.name)}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <p className="truncate font-display text-sm font-bold text-foreground sm:text-base">
                        {current.name}
                      </p>
                      <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-obsidian/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        <Globe2 className="h-2.5 w-2.5 text-electric" />
                        {current.region === "IT" ? "Italy" : "United States"}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{current.action}</p>

                    <p className="mt-2 flex items-center gap-2">
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-positive sm:h-5 sm:w-5" />
                      <span className="font-mono text-xl font-bold tracking-tight text-positive drop-shadow-[0_0_14px_color-mix(in_oklab,var(--positive)_45%,transparent)] sm:text-3xl">
                        {current.amount}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/60 pt-3">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-positive sm:text-xs">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    {t.activity.verified} • ITAL NOVA CRYPTO
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")} / {total}
                  </span>
                </div>

                <div className="mt-3 h-0.5 w-full overflow-hidden rounded-full bg-border/60">
                  <div
                    key={current.id}
                    className="h-full origin-left rounded-full bg-positive/70 animate-activity-progress"
                  />
                </div>
              </div>
            </article>
          </div>

          <div className="relative mt-6 flex items-center justify-center gap-1.5">
            {ACTIVITY_ITEMS.map((item, idx) => (
              <span
                key={item.id}
                aria-hidden="true"
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === index ? "w-6 bg-positive" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
      }
