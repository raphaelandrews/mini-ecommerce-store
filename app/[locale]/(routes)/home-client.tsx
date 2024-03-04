"use client"

import { useTranslations } from 'next-intl';

import { Category, Product } from "@/types";

import ProductList from "@/components/product-list";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";
import CategoriesListHome from '@/components/categories-list-home';

interface HomePageProps {
  billboard: Billboard;
  products: Product[];
  categories: Category[];
}

const HomePageClient = ({ billboard, categories, products }: HomePageProps) => {
  const t = useTranslations('Home');

  return (
    <Container>
      <main className="space-y-10 min-h-screen pb-10">
        <Billboard
          data={billboard}
        />
        <ProductList title={t('featuredProducts')} items={products} />
        <CategoriesListHome categories={categories} />
      </main>
    </Container>
  )
};

export default HomePageClient;