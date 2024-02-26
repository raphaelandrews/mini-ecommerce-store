import { Product } from "@/types";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ProductCard from "@/components/ui/product-card";
import NoResults from "@/components/ui/no-results";

interface ProductListProps {
  title: string;
  items: Product[]
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  items
}) => {
  return (
    <>
      <h3 className="font-bold text-3xl">{title}</h3>
      {items.length === 0 && <NoResults />}
      <Carousel
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
              <ProductCard key={item.id} data={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden 2xl:flex" />
        <CarouselNext className="hidden 2xl:flex" />
      </Carousel>
    </>
  );
}

export default ProductList;
