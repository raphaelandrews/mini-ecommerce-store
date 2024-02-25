import {useTranslations} from 'next-intl';

import { Product } from "@/types";

import ProductList from "@/components/product-list";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";

interface HomePageProps {
  billboard: Billboard;
  products: Product[];
}

const HomePageClient = ({billboard, products}: HomePageProps) => {
  const t = useTranslations('Home');

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard 
          data={billboard}
        />
        <div className="flex flex-col gap-y-8">
          <ProductList title={t('featuredProducts')} items={products} />
        </div>
      </div>
    </Container>
  )
};

export default HomePageClient;