"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MortgageDetails } from "@/services/mortgage";

interface MortgageInputFormProps {
  onCalculate: (details: MortgageDetails) => void;
}

// Function to format numbers with commas
const formatNumberWithCommas = (value: string): string => {
  const number = parseFloat(value.replace(/,/g, ''));
  if (isNaN(number)) {
    return "";
  }
  return number.toLocaleString();
};

// Function to remove commas before parsing
const removeCommas = (value: string): string => {
  return value.replace(/,/g, '');
};

export const MortgageInputForm: React.FC<MortgageInputFormProps> = ({ onCalculate }) => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [propertyValue, setPropertyValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const details: MortgageDetails = {
      loanAmount: parseFloat(removeCommas(loanAmount)),
      interestRate: parseFloat(removeCommas(interestRate)) / 100,
      loanTerm: parseInt(removeCommas(loanTerm)),
      downPayment: parseFloat(removeCommas(downPayment)),
      propertyValue: parseFloat(removeCommas(propertyValue)),
    };

    onCalculate(details);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <Label htmlFor="loanAmount">Loan Amount</Label>
        <Input
          type="text"
          id="loanAmount"
          placeholder="Enter loan amount"
          value={loanAmount}
          onChange={(e) => {
            const formattedValue = formatNumberWithCommas(e.target.value);
            setLoanAmount(formattedValue);
          }}
          required
        />
      </div>
      <div>
        <Label htmlFor="interestRate">Interest Rate (%)</Label>
        <Input
          type="text"
          id="interestRate"
          placeholder="Enter interest rate"
          value={interestRate}
          onChange={(e) => {
            const formattedValue = formatNumberWithCommas(e.target.value);
            setInterestRate(formattedValue);
          }}
          required
        />
      </div>
      <div>
        <Label htmlFor="loanTerm">Loan Term (Years)</Label>
        <Input
          type="text"
          id="loanTerm"
          placeholder="Enter loan term"
          value={loanTerm}
          onChange={(e) => {
            const formattedValue = formatNumberWithCommas(e.target.value);
            setLoanTerm(formattedValue);
          }}
          required
        />
      </div>
      <div>
        <Label htmlFor="downPayment">Down Payment</Label>
        <Input
          type="text"
          id="downPayment"
          placeholder="Enter down payment"
          value={downPayment}
          onChange={(e) => {
            const formattedValue = formatNumberWithCommas(e.target.value);
            setDownPayment(formattedValue);
          }}
          required
        />
      </div>
      <div>
        <Label htmlFor="propertyValue">Property Value</Label>
        <Input
          type="text"
          id="propertyValue"
          placeholder="Enter property value"
          value={propertyValue}
          onChange={(e) => {
            const formattedValue = formatNumberWithCommas(e.target.value);
            setPropertyValue(formattedValue);
          }}
          required
        />
      </div>
      <Button type="submit">Calculate</Button>
    </form>
  );
};
