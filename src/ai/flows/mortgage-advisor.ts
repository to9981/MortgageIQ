// src/ai/flows/mortgage-advisor.ts
'use server';

/**
 * @fileOverview An AI-powered mortgage advisor flow.
 *
 * - analyzeMortgage - A function that provides AI-driven insights on a mortgage.
 * - AnalyzeMortgageInput - The input type for the analyzeMortgage function.
 * - AnalyzeMortgageOutput - The return type for the analyzeMortgage function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {MortgageDetails} from '@/services/mortgage';

const AnalyzeMortgageInputSchema = z.object({
  mortgageDetails: z.object({
    loanAmount: z.number().describe('The total loan amount.'),
    interestRate: z.number().describe('The annual interest rate (e.g., 0.05 for 5%).'),
    loanTerm: z.number().describe('The loan term in years.'),
    downPayment: z.number().describe('The down payment amount.'),
    propertyValue: z.number().describe('The value of the property.'),
  }).describe('Mortgage details'),
  financialProfile: z.string().describe('A description of the user\s financial profile.'),
});
export type AnalyzeMortgageInput = z.infer<typeof AnalyzeMortgageInputSchema>;

const AnalyzeMortgageOutputSchema = z.object({
  isFavorable: z.boolean().describe('Whether the mortgage is favorable based on current conditions.'),
  insights: z.string().describe('AI-driven insights on the mortgage and market conditions.'),
});
export type AnalyzeMortgageOutput = z.infer<typeof AnalyzeMortgageOutputSchema>;

export async function analyzeMortgage(input: AnalyzeMortgageInput): Promise<AnalyzeMortgageOutput> {
  return analyzeMortgageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMortgagePrompt',
  input: {
    schema: z.object({
      mortgageDetails: z.object({
        loanAmount: z.number().describe('The total loan amount.'),
        interestRate: z.number().describe('The annual interest rate (e.g., 0.05 for 5%).'),
        loanTerm: z.number().describe('The loan term in years.'),
        downPayment: z.number().describe('The down payment amount.'),
        propertyValue: z.number().describe('The value of the property.'),
      }).describe('Mortgage details'),
      financialProfile: z.string().describe('A description of the user\s financial profile.'),
    }),
  },
  output: {
    schema: z.object({
      isFavorable: z.boolean().describe('Whether the mortgage is favorable based on current conditions.'),
      insights: z.string().describe('AI-driven insights on the mortgage and market conditions.'),
    }),
  },
  prompt: `You are an AI-powered mortgage advisor. Analyze the provided mortgage details and financial profile to determine if the mortgage is favorable.

Mortgage Details:
Loan Amount: {{{mortgageDetails.loanAmount}}}
Interest Rate: {{{mortgageDetails.interestRate}}}
Loan Term: {{{mortgageDetails.loanTerm}}} years
Down Payment: {{{mortgageDetails.downPayment}}}
Property Value: {{{mortgageDetails.propertyValue}}}

Financial Profile: {{{financialProfile}}}

Consider current market conditions and provide insights on whether the mortgage is favorable for the user. Clearly state whether the mortgage is favorable or not in the isFavorable field.
`,
});

const analyzeMortgageFlow = ai.defineFlow<
  typeof AnalyzeMortgageInputSchema,
  typeof AnalyzeMortgageOutputSchema
>({
  name: 'analyzeMortgageFlow',
  inputSchema: AnalyzeMortgageInputSchema,
  outputSchema: AnalyzeMortgageOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
