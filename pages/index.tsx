import useSWR from "swr";
import MultiFilterResponsive from "../features/multiFilterResponsive/MultiFilterResponsive";

const url =
  "https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json";

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export async function getServerSideProps() {
  const data = await fetcher(url);
  return { props: { fallbackData: data } };
}

export default function Home({ fallbackData }: any) {
  const { data, error } = useSWR(URL, fetcher, { fallbackData });

  return <MultiFilterResponsive data={data.Brastlewark}></MultiFilterResponsive>;
}
