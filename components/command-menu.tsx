"use client"

import * as React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import {
    CheckIcon,
    CommandIcon,
    LaptopIcon,
    MoonIcon,
    SunIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { formatFlag } from "@/utils/format-flag";
import { locales } from "@/i18n";

import { Button } from "@/components/ui/button";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";

const CommandMenu = () => {
    const [open, setOpen] = React.useState(false);
    const { setTheme } = useTheme();
    const pathname = usePathname();
    const [language, setLanguage] = React.useState<string>(() => {
        const pathnameParts = pathname.split('/');
        return pathnameParts[1].toUpperCase();
    });

    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const router = useRouter();

    const handleLanguageChange = (selectedLanguage: string) => {
        const pathnameParts = pathname.split('/');
        const restOfPathname = pathnameParts.slice(2).join('/');
        const newPathname = `/${selectedLanguage}/${restOfPathname}`;

        router.push(newPathname);
        setLanguage(pathnameParts[1].toUpperCase());
    };

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false)
        command()
    }, [])

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <Button variant="tertiary" size="icon" onClick={() => setOpen(!open)}>
                <CommandIcon size={20} />
            </Button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Language">
                        {locales.map((lang) => (
                            <CommandItem
                                key={lang}
                                onClick={() => handleLanguageChange(lang)}
                                className={cn("flex items-center gap-2", lang.toUpperCase() === language ? "bg-tertiary dark:bg-card hover:dark:bg-accent transition-all" : '')}
                            >
                                <Image
                                    src={formatFlag(lang)}
                                    alt={lang}
                                    width={20}
                                    height={20}
                                />
                                {lang.toUpperCase()}

                                {lang.toUpperCase() === language ? (
                                    <CheckIcon className="h-4 w-4" />
                                ) : <div className="h-4 w-4" />}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Theme">
                        <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
                            <SunIcon className="mr-2 h-4 w-4" />
                            Light
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
                            <MoonIcon className="mr-2 h-4 w-4" />
                            Dark
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
                            <LaptopIcon className="mr-2 h-4 w-4" />
                            System
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}

export default CommandMenu;

interface SelectItemProps {
    children: React.ReactNode;
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