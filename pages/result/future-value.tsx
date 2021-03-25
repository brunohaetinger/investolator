import Link from "next/link";
import { useRouter } from "next/router";
import { Loading } from "../../src/components/Loading";
import { useFutureValueResult } from "../../src/hooks/useFutureValueResult";

const FutureValueResultPage = () => {
  const { query } = useRouter();
  const { initialAmount, interestRate, periods } = query;
  const result = useFutureValueResult(initialAmount, interestRate, periods);

  return (
    <>
      {result === null ? (
        <Loading />
      ) : (
        <h1>Future Value Result Page : {result}</h1>
      )}
      <Link href="/">
        <a>Go Home</a>
      </Link>
    </>
  );
};

export default FutureValueResultPage;
