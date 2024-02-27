import Image from "next/image";
import { useTranslations } from 'next-intl';
import { X } from "lucide-react";

import useCart from "@/hooks/use-cart";
import { Product } from "@/types";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";

interface CartItemProps {
  data: Product;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ data, quantity }) => {
  const cart = useCart();
  const t = useTranslations('CartItem');

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  return (
    <li className="flex py-6">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images?.[0]?.url || ""}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-secondary">{data.name}</p>
          </div>
          <div className="mt-1 flex text-sm">
            <p className="text-muted">{data.country?.name}</p>
            <p className="ml-4 border-l border-border pl-4 text-muted">{data.subcategory?.name}</p>
          </div>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <p className="text-lg font-semibold text-secondary">{quantity}</p>
            *
            <Currency value={data.price} />
          </div>
          <br/>
          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <p className="text-lg font-semibold text-secondary">{t('itemTotal')}</p>
            <Currency value={parseInt(data.price) * quantity} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;

