"use client"

import { useState } from "react";
import { useTranslations } from 'next-intl';
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

import { Product } from "@/types";
import useCart from "@/hooks/use-cart";

import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";

interface InfoProps {
  data: Product
};

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const { userId } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const t = useTranslations('Info');

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const onCheckout = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds: [data.id],
      quantities: [quantity],
      clientId: userId
    });

    window.location = response.data.url;
  };

  const onAddToCart = () => {
    cart.addItem(data, quantity);
    setQuantity(1);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-2xl text-gray-900">
          <Currency value={parseInt(data?.price) * quantity} />
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">{t('subcategory')}:</h3>
          <div>
            {data?.subcategory?.name}
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">{t('country')}:</h3>
        </div>
      </div>
      <div className="flex items-center space-x-4 mt-8">
        <Button
          onClick={decreaseQuantity}
          variant="secondary"
          className="font-semibold w-10 h-10 p-0"
        >
          -
        </Button>
        <span className="font-semibold">{quantity}</span>
        <Button
          onClick={increaseQuantity}
          variant="secondary"
          className="font-semibold w-10 h-10 p-0"
        >
          +
        </Button>
      </div>
      <div className="flex gap-3 mt-4">
        <Button onClick={onCheckout} className="w-full">
          {t('fastBuy')}
        </Button>
        <Button onClick={onAddToCart} className="w-full">
          {t('addToCart')}
        </Button>
      </div>
    </div>
  );
}

export default Info;
