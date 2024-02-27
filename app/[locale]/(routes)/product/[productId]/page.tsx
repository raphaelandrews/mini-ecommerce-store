export const dynamic = 'force-dynamic'
import getProduct from '@/actions/get-product';
import getProducts from '@/actions/get-products';

import ProductPageClient from './product-client';

export const revalidate = 0;

interface ProductPageProps {
  params: {
    productId: string;
  },
}

const ProductPage: React.FC<ProductPageProps> = async ({
  params
}) => {
  const product = await getProduct(params.productId);
  const suggestedProducts = await getProducts({
    subcategoryId: product?.subcategory?.id
  });

  if (!product) {
    return null;
  }

  return (
    <main className='min-h-screen'>
      <ProductPageClient product={product} suggestedProducts={suggestedProducts} />
    </main>
  )
}

export default ProductPage;
