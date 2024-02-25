"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { UserButton, auth } from "@clerk/nextjs";
import { ShoppingCartIcon } from "lucide-react";

import useCart from "@/hooks/use-cart";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const NavbarActions = ({userId}: {userId: any}) => {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        onClick={() => router.push('/cart')}
        variant='default'
        className="gap-3"
      >
        <ShoppingCartIcon size={20} />
        <span className="mt-1 font-medium">
          {cart.items.length}
        </span>
      </Button>
      <div className="ml-auto flex items-center space-x-4">
        <ThemeToggle />
        {userId ? (
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox:
                  "w-10 h-10",
              },
            }}
          />
        ) : (
          <Button onClick={() => router.push('/sign-in')}>
            Login
          </Button>
        )}
      </div>
    </div>
  );
}

export default NavbarActions;