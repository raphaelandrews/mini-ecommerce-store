import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import getCategories from "@/actions/get-categories";
import HomePageClient from './home-client';

export const revalidate = 0;

const HomePage = async () => {
  const categories = await getCategories();
  const products = await getProducts({ isFeatured: true });
  const billboard = await getBillboard("f29a38e1-3395-4b95-ba7b-4ef0c8248458");

  return (
    <HomePageClient billboard={billboard} products={products} categories={categories} />
  )
};

export default HomePage;