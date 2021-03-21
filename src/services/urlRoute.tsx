export default function urlRoute(route: string, params: object) {
  const url = new URL(`${location.origin}${route}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== "") {
      url.searchParams.set(key, value);
    }
  });
  return url.href;
}
