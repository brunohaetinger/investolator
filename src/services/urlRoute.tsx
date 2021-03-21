export default function urlRoute(route: string, params: object) {
  const url = new URL(`${process.env.NEXT_PUBLIC_HOST}${route}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== "") {
      url.searchParams.set(key, value);
    }
  });
  return url.href;
}
