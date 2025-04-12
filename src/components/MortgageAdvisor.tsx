
"use client";

import { useState, useEffect } from "react";
import { analyzeMortgage, AnalyzeMortgageOutput } from "@/ai/flows/mortgage-advisor";
import { MortgageDetails } from "@/services/mortgage";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface MortgageAdvisorProps {
  details: MortgageDetails | null;
}

export const MortgageAdvisor: React.FC<MortgageAdvisorProps> = ({ details }) => {
  const [financialProfile, setFinancialProfile] = useState("");
  const [advisorInsights, setAdvisorInsights] = useState<AnalyzeMortgageOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setAdvisorInsights(null);
  }, [details]);

  const handleGetInsights = async () => {
    if (!details) {
      alert("Please calculate mortgage first.");
      return;
    }

    setIsLoading(true);
    try {
      const insights = await analyzeMortgage({
        mortgageDetails: details,
        financialProfile: financialProfile,
      });
      setAdvisorInsights(insights);
    } catch (error) {
      console.error("Error fetching insights:", error);
      alert("Failed to fetch insights.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-4">
      <div>
        <label htmlFor="financialProfile">Financial Profile</label>
        <Textarea
          id="financialProfile"
          placeholder="Describe your financial profile"
          value={financialProfile}
          onChange={(e) => setFinancialProfile(e.target.value)}
        />
      </div>
      <Button onClick={handleGetInsights} disabled={isLoading}>
        {isLoading ? (
          <>
            Loading <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          </>
        ) : (
          "Get Insights"
        )}
      </Button>

      {advisorInsights && (
        <Card className="mt-4">
          <CardContent>
            <p>
              <strong>Favorable:</strong> {advisorInsights.isFavorable ? "Yes" : "No"}
            </p>
            <p>
              <strong>Insights:</strong> {advisorInsights.insights}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
