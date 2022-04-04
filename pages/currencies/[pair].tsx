import Link from "next/link";
import Image from "next/image";
import coinsPic from "../../public/coins.jpg";

const CurrenciesPairPage = ({ data }) => {
  return (
    <>
      <Image
        src={coinsPic}
        alt="Picture for coins"
        layout="fixed"
        width={100}
        height={100}
      />
      <p>
        Ask value for {data.name}: {data.ask}
      </p>
      <Link href="/">
        <a>Go Home</a>
      </Link>
    </>
  );
};

export async function getServerSideProps(context) {
  const pair = context.params.pair;
  const res = await fetch(
    `https://economia.awesomeapi.com.br/json/last/${pair}`
  );
  const data = await res.json();

  const [baseCurrency] = pair.split("-");
  console.log({ baseCurrency });
  return {
    props: {
      data: data[baseCurrency.toUpperCase()],
    }, // will be passed to the page component as props
  };
}

export default CurrenciesPairPage;
