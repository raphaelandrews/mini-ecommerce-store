"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from 'next-intl';
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";

const Summary = () => {
  const { userId } = useAuth();
  const t = useTranslations('Summary');
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success(t('paymentCompleted'));
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error(t('somethingWentWrong'));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + (Number(item.product.price) * item.quantity);
  }, 0);

  const onCheckout = async () => {
    const productIds = items.map((item) => item.product.id);
    const quantities = items.map((item) => item.quantity);

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds,
      quantities,
      clientId: userId
    });

    window.location = response.data.url;
  };

  return (
    <div className="mt-16 rounded-lg bg-card px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-primary">{t('orderSummary')}</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-primary">{t('orderTotal')}</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        variant="secondary"
        onClick={onCheckout}
        disabled={items.length === 0}
        className="w-full mt-12"
      >
        {t('checkout')}
      </Button>
    </div>
  );
};

export default Summary;
