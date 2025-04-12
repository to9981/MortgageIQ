
"use client";

import { useState } from "react";
import { MortgageInputForm } from "@/components/MortgageInputForm";
import { QuoteSummary } from "@/components/QuoteSummary";
import { AmortizationSchedule } from "@/components/AmortizationSchedule";
import { MortgageAdvisor } from "@/components/MortgageAdvisor";
import { calculateMortgage, MortgageDetails, MortgageQuote } from "@/services/mortgage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [mortgageQuote, setMortgageQuote] = useState<MortgageQuote | null>(null);
  const [mortgageDetails, setMortgageDetails] = useState<MortgageDetails | null>(null);

  const handleCalculate = async (details: MortgageDetails) => {
    setMortgageDetails(details);
    const quote = await calculateMortgage(details);
    setMortgageQuote(quote);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">MortgageIQ</h1>

      <Card className="mb-5">
        <CardHeader>
          <CardTitle>Mortgage Input Form</CardTitle>
        </CardHeader>
        <CardContent>
          <MortgageInputForm onCalculate={handleCalculate} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle>Quote Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <QuoteSummary quote={mortgageQuote} details={mortgageDetails} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mortgage Advisor</CardTitle>
          </CardHeader>
          <CardContent>
            <MortgageAdvisor details={mortgageDetails} />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Amortization Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <AmortizationSchedule quote={mortgageQuote} />
        </CardContent>
      </Card>
    </div>
  );
}
