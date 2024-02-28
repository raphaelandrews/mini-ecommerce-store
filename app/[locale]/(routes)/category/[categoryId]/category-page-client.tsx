"use client"

import { useTranslations } from 'next-intl';

import Filter from './components/filter';
import MobileFilters from './components/mobile-filters';
import Container from '@/components/ui/container';
import Billboard from '@/components/ui/billboard';
import ProductCard from '@/components/ui/product-card';
import NoResults from '@/components/ui/no-results';
import { Category, Country, Product, Subcategory } from '@/types';

export const revalidate = 0;

interface CategoryPageClientProps {
    category: Category;
    countries: Country[];
    products: Product[];
    subcategories: Subcategory[];
}

const CategoryPageClient: React.FC<CategoryPageClientProps> = ({
    category,
    countries,
    products,
    subcategories
}) => {
    const t = useTranslations('CategoryPage');

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
                                name={t('subcategories')}
                                data={subcategories}
                            />
                            <Filter
                                valueKey="countryId"
                                name={t('countries')}
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

export default CategoryPageClient;
