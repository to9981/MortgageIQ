
import { MortgageQuote, MortgageDetails } from "@/services/mortgage";
import { DollarSign, Percent, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuoteSummaryProps {
  quote: MortgageQuote | null;
  details: MortgageDetails | null;
}

export const QuoteSummary: React.FC<QuoteSummaryProps> = ({ quote, details }) => {
  if (!quote || !details) {
    return <p>Enter mortgage details to view the quote summary.</p>;
  }

  const formattedMonthlyPayment = quote.monthlyPayment.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedInterestRate = (details.interestRate * 100).toFixed(2);
  const formattedTotalInterestPaid = quote.totalInterestPaid.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="grid gap-4">
      <div className="flex items-center space-x-2">
        <DollarSign className="h-4 w-4 text-primary" />
        <span>Monthly Payment:</span>
        <span>${formattedMonthlyPayment}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Percent className="h-4 w-4 text-primary" />
        <span>Interest Rate:</span>
        <span>{formattedInterestRate}%</span>
      </div>
      <div className="flex items-center space-x-2">
        <Calendar className="h-4 w-4 text-primary" />
        <span>Loan Term:</span>
        <span>{details.loanTerm} years</span>
      </div>
      <div className="flex items-center space-x-2">
        <DollarSign className="h-4 w-4 text-primary" />
        <span>Total Interest Paid:</span>
        <span>${formattedTotalInterestPaid}</span>
      </div>
    </div>
  );
};
