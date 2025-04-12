/**
 * Represents the details required to calculate a mortgage.
 */
export interface MortgageDetails {
  /**
   * The total loan amount.
   */
  loanAmount: number;
  /**
   * The annual interest rate as a decimal (e.g., 0.05 for 5%).
   */
  interestRate: number;
  /**
   * The loan term in years.
   */
  loanTerm: number;
  /**
   * The down payment amount.
   */
  downPayment: number;
  /**
   * The value of the property.
   */
  propertyValue: number;
}

/**
 * Represents a calculated mortgage quote.
 */
export interface MortgageQuote {
  /**
   * The monthly mortgage payment amount.
   */
  monthlyPayment: number;
  /**
   * The total interest paid over the life of the loan.
   */
  totalInterestPaid: number;
  /**
   * An array representing the amortization schedule.
   */
  amortizationSchedule: AmortizationEntry[];
}

/**
 * Represents an entry in the amortization schedule.
 */
export interface AmortizationEntry {
  /**
   * The payment number.
   */
  paymentNumber: number;
  /**
   * The amount paid towards principal.
   */
  principalPaid: number;
  /**
   * The amount paid towards interest.
   */
  interestPaid: number;
  /**
   * The remaining loan balance.
   */
  remainingBalance: number;
}

/**
 * Asynchronously calculates the mortgage quote based on the provided details.
 *
 * @param details The mortgage details used for calculation.
 * @returns A promise that resolves to a MortgageQuote object.
 */
export async function calculateMortgage(details: MortgageDetails): Promise<MortgageQuote> {
  const { loanAmount, interestRate, loanTerm } = details;

  const monthlyInterestRate = interestRate / 12;
  const numberOfPayments = loanTerm * 12;

  // Calculate monthly payment using the standard mortgage formula
  const monthlyPayment =
    (loanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

  let remainingBalance = loanAmount;
  let totalInterestPaid = 0;
  const amortizationSchedule: AmortizationEntry[] = [];

  for (let paymentNumber = 1; paymentNumber <= numberOfPayments; paymentNumber++) {
    const interestPaid = remainingBalance * monthlyInterestRate;
    const principalPaid = monthlyPayment - interestPaid;

    remainingBalance -= principalPaid;
    totalInterestPaid += interestPaid;

    amortizationSchedule.push({
      paymentNumber,
      principalPaid,
      interestPaid,
      remainingBalance: Math.max(0, remainingBalance), // Prevent negative balance due to rounding errors
    });
  }

  const formattedTotalInterestPaid = parseFloat(totalInterestPaid.toFixed(2));
  const formattedMonthlyPayment = parseFloat(monthlyPayment.toFixed(2));

  return {
    monthlyPayment: formattedMonthlyPayment,
    totalInterestPaid: formattedTotalInterestPaid,
    amortizationSchedule,
  };
}
