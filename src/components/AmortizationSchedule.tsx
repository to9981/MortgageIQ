
import { MortgageQuote } from "@/services/mortgage";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface AmortizationScheduleProps {
  quote: MortgageQuote | null;
}

export const AmortizationSchedule: React.FC<AmortizationScheduleProps> = ({ quote }) => {
  if (!quote) {
    return <p>Calculate mortgage to view the amortization schedule.</p>;
  }

  return (
    <Table>
      <TableCaption>Detailed amortization schedule</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Payment</TableHead>
          <TableHead>Principal</TableHead>
          <TableHead>Interest</TableHead>
          <TableHead>Balance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {quote.amortizationSchedule.map((entry) => (
          <TableRow key={entry.paymentNumber}>
            <TableCell className="font-medium">{entry.paymentNumber}</TableCell>
            <TableCell>${entry.principalPaid.toFixed(2)}</TableCell>
            <TableCell>${entry.interestPaid.toFixed(2)}</TableCell>
            <TableCell>${entry.remainingBalance.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
