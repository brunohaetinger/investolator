export default function urlRoute(route: string, params: object) {
  const url = new URL(`http://localhost:3000${route}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== "") {
      url.searchParams.set(key, value);
    }
  });
  return url.href;
}
