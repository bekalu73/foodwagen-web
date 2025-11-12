type ParamValue = string | number | boolean | Date | null | undefined;
type Params = Record<string, ParamValue>;

const formatDate = (date: Date): string => {
  return date.toISOString();
};

export function buildUrl(baseUrl: string, params: Params): string {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      value === "null"
    ) {
      continue;
    }

    const formattedValue =
      value instanceof Date ? formatDate(value) : String(value);
    searchParams.append(key, formattedValue);
  }

  const queryString = searchParams.toString();
  return queryString
    ? `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}${queryString}`
    : baseUrl;
}
