import { useEffect, useState } from "react";
import { getFutureValueResult } from "../services/CalculatorService";

export const useFutureValueResult = (initialAmount: any, interestRate: any, periods: any) => {
  const [result, setResult] = useState(null);
  
  useEffect(()=> {
    if(initialAmount && interestRate && periods){
      const getFutureValue = async () =>{
        const result = await getFutureValueResult(initialAmount, interestRate, periods)
        setResult(result);
      }
      getFutureValue();
    }
  })

  return result;
}