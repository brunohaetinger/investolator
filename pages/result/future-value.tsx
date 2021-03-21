import Link from "next/link";

interface FutureValueResultProps {
  result: number;
}

const FutureValueResult = ({ result }: FutureValueResultProps) => {
  console.log(result);
  return (
    <>
      <h1>Future Value Result Page : {result}</h1>
      <Link href="/">
        <a>Go Home</a>
      </Link>
    </>
  );
};

const getFutureValueResult = async (
  initialAmount: number,
  interestRate: number,
  periods: number
) => {
  try {
    const res = await fetch(`${process.env.HOST}/api/result/future-value`, {
      method: "POST",
      body: JSON.stringify({
        initialAmount,
        interestRate,
        periods,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { result } = await res.json();
    return result;
  } catch (err) {
    console.log("Error calculating future value. 😥", err);
  }
};

export async function getServerSideProps(context: any) {
  const { initialAmount, interestRate, periods } = context.query;
  return {
    props: {
      result: await getFutureValueResult(initialAmount, interestRate, periods),
    }, // will be passed to the page component as props
  };
}

export default FutureValueResult;
