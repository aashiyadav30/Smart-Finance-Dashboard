import { InsightsPanel } from "@/components/finance/InsightsPanel";

/**
 * Insights page — dynamic financial analysis.
 */
export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Insights</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Analyse your spending patterns and financial health
        </p>
      </div>

      <InsightsPanel />
    </div>
  );
}
