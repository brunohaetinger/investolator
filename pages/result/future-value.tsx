import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getFutureValueResult } from "../../src/services/CalculatorService";


const FutureValueResult = () => {
  const [result, setResult] = useState(null);
  const {query, isReady} = useRouter();
  const loading = <h2>Loading...</h2>;

  useEffect(()=> {
    if(isReady){
      const {initialAmount, interestRate, periods } = query;
      console.log(query);
      const getFutureValue = async () =>{
        const result = await getFutureValueResult(initialAmount, interestRate, periods)
        setResult(result);
      }
      getFutureValue();
    }
  }, [isReady])

  if(!isReady){
    return loading
  }

  return (
    <>
      { result === null ? loading : <h1>Future Value Result Page : {result}</h1> }
      <Link href="/">
        <a>Go Home</a>
      </Link>
    </>
  );
};

export default FutureValueResult;
