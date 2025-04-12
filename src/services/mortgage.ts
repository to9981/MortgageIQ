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
  // TODO: Implement this by calling an API.

  return {
    monthlyPayment: 1500,
    totalInterestPaid: 100000,
    amortizationSchedule: [
      {
        paymentNumber: 1,
        principalPaid: 500,
        interestPaid: 1000,
        remainingBalance: details.loanAmount - 500,
      },
    ],
  };
}
