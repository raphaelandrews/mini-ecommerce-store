"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Expand, ShoppingCart } from "lucide-react";
import axios from "axios";

import useCart from "@/hooks/use-cart";
import { Product } from "@/types";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import { Button } from "@/components/ui/button";
import usePreviewModal from "@/hooks/use-preview-modal";

interface ProductCard {
  data: Product
}

const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  const previewModal = usePreviewModal();
  const cart = useCart();
  const router = useRouter();
  const { userId} = useAuth();
  const [quantity, setQuantity] = useState(1);

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
    <div className="group rounded-xl border p-3 space-y-4">
      <div onClick={handleClick} className="aspect-square rounded-xl bg-gray-100 relative cursor-pointer">
        <Image
          src={data.images?.[0]?.url}
          alt=""
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
        <p className="text-sm text-gray-500">{data.subcategory?.name}</p>
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
      <div className="flex gap-3">
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

export default ProductCard;
