"use client";

import { useState } from "react";
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
  const [quantity, setQuantity] = useState(1);

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
    });

    window.location = response.data.url;
  };

  const onAddToCart = () => {
    cart.addItem(data, quantity);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={parseInt(data?.price) * quantity} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Subctegory:</h3>
          <div>
            {data?.subcategory?.name}
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Country:</h3>
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
          ⚡ Fast Buy
        </Button>
        <Button onClick={onAddToCart} className="w-full">
          Add To Cart
        </Button>
      </div>
    </div>
  );
}

export default Info;
