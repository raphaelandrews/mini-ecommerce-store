"use client";

import { MouseEventHandler, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from 'next-intl';
import { useAuth } from "@clerk/nextjs";
import { Expand, ShoppingCart } from "lucide-react";
import axios from "axios";

import useCart from "@/hooks/use-cart";
import usePreviewModal from "@/hooks/use-preview-modal";
import { Product } from "@/types";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import { Button } from "@/components/ui/button";

interface ProductCard {
  data: Product
}

const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  const previewModal = usePreviewModal();
  const cart = useCart();
  const router = useRouter();
  const { userId } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const t = useTranslations('ProductCard');

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data, quantity);
    setQuantity(1);
  };

  const onCheckout = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds: [data.id],
      quantities: [quantity],
      clientId: userId
    });

    window.location = response.data.url;
  };

  return (
    <div className="group p-3 space-y-4 bg-card rounded-xl border dark:border-2">
      <div onClick={handleClick} className="aspect-square rounded-xl bg-gray-100 relative cursor-pointer">
        <Image
          src={data.images?.[0]?.url}
          alt={data.name}
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-muted" />}
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-muted" />}
            />
          </div>
        </div>
      </div>
      <div onClick={handleClick} className="cursor-pointer">
        <p className="font-semibold text-lg">{data.name}</p>
        <p className="text-sm text-muted">{data.subcategory?.name}</p>
      </div>
      <div className="flex items-center justify-between">
        <Currency value={parseInt(data?.price) * quantity} />
      </div>
      <div className="flex items-center space-x-4 mt-8">
        <Button
          onClick={decreaseQuantity}
          variant="outline"
          className="font-semibold w-10 h-10 p-0"
        >
          -
        </Button>
        <span className="font-semibold">{quantity}</span>
        <Button
          onClick={increaseQuantity}
          variant="outline"
          className="font-semibold w-10 h-10 p-0"
        >
          +
        </Button>
      </div>
      <div className="grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 gap-3">
        <Button onClick={onCheckout}>
          {t('fastBuy')}
        </Button>
        <Button onClick={onAddToCart}>
          {t('addToCart')}
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
