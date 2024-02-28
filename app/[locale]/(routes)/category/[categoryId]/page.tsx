import getProducts from "@/actions/get-products";
import getCategory from '@/actions/get-category';
import getSubcategories from '@/actions/get-subcategories';
import getCountries from '@/actions/get-countries';

import CategoryPageClient from './category-page-client';

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    categoryId: string;
  },
  searchParams: {
    countryId: string;
    subcategoryId: string;
  }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams
}) => {
  const products = await getProducts({
    countryId: searchParams.countryId,
    subcategoryId: searchParams.subcategoryId,
  });
  const subcategories = await getSubcategories();
  const countries = await getCountries();
  const category = await getCategory(params.categoryId);

  return (
    <CategoryPageClient
      category={category }
      countries={countries}
      products={products}
      subcategories={subcategories}
    />
  );
};

export default CategoryPage;
