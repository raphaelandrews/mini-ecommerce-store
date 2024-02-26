"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { CheckIcon, ShoppingCartIcon } from "lucide-react";

import useCart from "@/hooks/use-cart";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeToggle } from "@/components/theme-toggle";
import { locales } from "@/i18n";
import { cn } from "@/lib/utils";

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
      <Select>
        <SelectTrigger className="w-20">
          <SelectValue placeholder={language} />
        </SelectTrigger>
        <SelectContent>
          {locales.map((lang) => (
            <SelectItem
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className="flex items-center gap-2"
            >
              {lang.toUpperCase() === language ? (
                <CheckIcon className="h-4 w-4" />
              ) : <div className="h-4 w-4" />}
              {lang.toUpperCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        onClick={() => router.push('/cart')}
        variant='tertiary'
        className="relative gap-3 px-2.5"
      >
        <ShoppingCartIcon size={20} />
        <span className="absolute flex items-center justify-center -top-1/4 -right-1/4 font-medium text-accent-foreground w-6 h-6 bg-accent rounded">
          {cart.items.reduce((total, currentItem) => total + currentItem.quantity, 0)}
        </span>
      </Button>

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

interface SelectItemProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const SelectItem = ({ children, className, onClick }: SelectItemProps) => {
  return (
    <div
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:text-tertiary-foreground hover:bg-tertiary focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
};