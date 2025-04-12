
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MortgageDetails } from "@/services/mortgage";

interface MortgageInputFormProps {
  onCalculate: (details: MortgageDetails) => void;
}

export const MortgageInputForm: React.FC<MortgageInputFormProps> = ({ onCalculate }) => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [propertyValue, setPropertyValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const details: MortgageDetails = {
      loanAmount: parseFloat(loanAmount),
      interestRate: parseFloat(interestRate) / 100,
      loanTerm: parseInt(loanTerm),
      downPayment: parseFloat(downPayment),
      propertyValue: parseFloat(propertyValue),
    };

    onCalculate(details);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div>
        <Label htmlFor="loanAmount">Loan Amount</Label>
        <Input
          type="number"
          id="loanAmount"
          placeholder="Enter loan amount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="interestRate">Interest Rate (%)</Label>
        <Input
          type="number"
          id="interestRate"
          placeholder="Enter interest rate"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="loanTerm">Loan Term (Years)</Label>
        <Input
          type="number"
          id="loanTerm"
          placeholder="Enter loan term"
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="downPayment">Down Payment</Label>
        <Input
          type="number"
          id="downPayment"
          placeholder="Enter down payment"
          value={downPayment}
          onChange={(e) => setDownPayment(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="propertyValue">Property Value</Label>
        <Input
          type="number"
          id="propertyValue"
          placeholder="Enter property value"
          value={propertyValue}
          onChange={(e) => setPropertyValue(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Calculate</Button>
    </form>
  );
};
