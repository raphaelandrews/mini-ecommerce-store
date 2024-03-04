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
  const countries = await getCountries();
  const category = await getCategory(params.categoryId);

  let categoryProducts = category.subcategories.flatMap(subcategory => subcategory.products);

  if (searchParams.subcategoryId) {
    categoryProducts = categoryProducts.filter(product => product.subcategory.id === searchParams.subcategoryId);
  }

  if (searchParams.countryId) {
    categoryProducts = categoryProducts.filter(product => product.country.id === searchParams.countryId);
  }

  return (
    <CategoryPageClient
      category={category}
      countries={countries}
      products={categoryProducts}
      subcategories={category.subcategories}
    />
  );
};

export default CategoryPage;
