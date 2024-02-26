"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { ShoppingCartIcon } from "lucide-react";

import useCart from "@/hooks/use-cart";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeToggle } from "@/components/theme-toggle";
import { locales } from "@/i18n";

const NavbarActions = ({ userId }: { userId: any }) => {
  const pathname = usePathname();
  const [language, setLanguage] = useState<string>(() => {
    const pathnameParts = pathname.split('/');
    return pathnameParts[1].toUpperCase();
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();

const handleLanguageChange = (selectedLanguage: string) => {
  const pathnameParts = pathname.split('/');
  const restOfPathname = pathnameParts.slice(2).join('/');
  const newPathname = `/${selectedLanguage}/${restOfPathname}`;

  router.push(newPathname); 
  setLanguage(pathnameParts[1].toUpperCase()); 
};


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
      <Select>
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder={language} />
        </SelectTrigger>
        <SelectContent>
          {locales.map((lang) => (
            <div key={lang} onClick={() => handleLanguageChange(lang)}>
                {lang.toUpperCase()}
            </div>
          ))}
        </SelectContent>
      </Select>

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
  );
}

export default NavbarActions;