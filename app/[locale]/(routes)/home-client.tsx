import { useTranslations } from 'next-intl';

import { Product } from "@/types";

import ProductList from "@/components/product-list";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";

interface HomePageProps {
  billboard: Billboard;
  products: Product[];
}

const HomePageClient = ({ billboard, products }: HomePageProps) => {
  const t = useTranslations('Home');

  return (
    <Container>
      <main className="space-y-10 min-h-screen pb-10">
        <Billboard
          data={billboard}
        />
        <ProductList title={t('featuredProducts')} items={products} />
      </main>
    </Container>
  )
};

export default HomePageClient;