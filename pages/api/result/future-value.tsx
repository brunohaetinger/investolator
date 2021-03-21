import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

/**
 * calculate Future Value.
 * @constructor
 * @param {number} interestRate - Percent of interest rate per period.
 */
function calculateFV(
  presentValue: number | string,
  interestRate: number | string,
  periods: number | string
): number {
  presentValue = Number(presentValue);
  interestRate = Number(interestRate);
  periods = Number(periods);
  const result = presentValue * Math.pow(1 + interestRate / 100, periods);
  return Number(result.toFixed(2));
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { initialAmount, interestRate, periods } = req.body;
  res
    .status(200)
    .json({ result: calculateFV(initialAmount, interestRate, periods) });
}
