import { Country } from "@/types";

const URL=`${process.env.NEXT_PUBLIC_API_URL}/countries`;

const getCountries = async (): Promise<Country[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getCountries;
