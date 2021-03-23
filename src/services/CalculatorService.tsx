export const getFutureValueResult = async (
  initialAmount: number | string,
  interestRate: number | string,
  periods: number | string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/result/future-value`,
      {
        method: "POST",
        body: JSON.stringify({
          initialAmount,
          interestRate,
          periods,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { result } = await res.json();
    return result;
  } catch (err) {
    console.log("Error calculating future value. 😥", err);
  }
};