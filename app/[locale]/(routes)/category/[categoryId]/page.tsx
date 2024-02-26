import getProducts from "@/actions/get-products";
import getCategory from '@/actions/get-category';
import getSubcategories from '@/actions/get-subcategories';
import getCountries from '@/actions/get-countries';

import Filter from './components/filter';
import MobileFilters from './components/mobile-filters';
import Container from '@/components/ui/container';
import Billboard from '@/components/ui/billboard';
import ProductCard from '@/components/ui/product-card';
import NoResults from '@/components/ui/no-results';

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
    <Container>
        <main className="min-h-screen">
        <Billboard 
          data={category.billboard}
        />
        <div className="pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <MobileFilters subcategories={subcategories} countries={countries} />
            <div className="hidden lg:block">
              <Filter
                valueKey="subcategoryId" 
                name="Subcategories" 
                data={subcategories}
              />
              <Filter 
                valueKey="countryId" 
                name="Countries" 
                data={countries}
              />
            </div>
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
    </main>
      </Container>
  );
};

export default CategoryPage;
