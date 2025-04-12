
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
import { ScrollArea } from "@/components/ui/scroll-area";

interface AmortizationScheduleProps {
  quote: MortgageQuote | null;
}

export const AmortizationSchedule: React.FC<AmortizationScheduleProps> = ({ quote }) => {
  if (!quote) {
    return <p>Calculate mortgage to view the amortization schedule.</p>;
  }

  return (
    <ScrollArea>
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
          {quote.amortizationSchedule.map((entry) => {
            const formattedPrincipalPaid = entry.principalPaid.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
            const formattedInterestPaid = entry.interestPaid.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
            const formattedRemainingBalance = entry.remainingBalance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });

            return (
              <TableRow key={entry.paymentNumber}>
                <TableCell className="font-medium">{entry.paymentNumber}</TableCell>
                <TableCell>${formattedPrincipalPaid}</TableCell>
                <TableCell>${formattedInterestPaid}</TableCell>
                <TableCell>${formattedRemainingBalance}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
