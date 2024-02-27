import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import HomePageClient from './home-client';
import {unstable_setRequestLocale} from 'next-intl/server';

export const revalidate = 0;


const HomePage = async ({ params: { locale } }: { params: { locale: string } }) => {
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("f29a38e1-3395-4b95-ba7b-4ef0c8248458");
  unstable_setRequestLocale(locale);
  return (
    <HomePageClient billboard={billboard} products={products} />
  )
};

export default HomePage;