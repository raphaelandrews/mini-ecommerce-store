"use client"

import * as React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useTranslations } from 'next-intl';
import {
    CheckIcon,
    CommandIcon,
    LaptopIcon,
    MoonIcon,
    SunIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { formatLang, formatLangFlag } from "@/utils/format-lang";
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
    const t = useTranslations('CommandMenu');

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
                <CommandInput placeholder={t('typeACommand')} />
                <CommandList>
                    <CommandEmpty>{t('noResults')}</CommandEmpty>
                    <CommandGroup heading={t('Language')}>
                        {locales.map((lang) => (
                            <CommandItem
                                key={lang}
                                onClick={() => handleLanguageChange(lang)}
                                className={cn("flex items-center gap-2", lang.toUpperCase() === language ? "bg-tertiary dark:bg-card hover:dark:bg-accent transition-all" : '')}
                            >
                                <Image
                                    src={formatLangFlag(lang)}
                                    alt={lang}
                                    width={20}
                                    height={20}
                                />
                                {formatLang(lang)}

                                {lang.toUpperCase() === language ? (
                                    <CheckIcon className="h-4 w-4" />
                                ) : <div className="h-4 w-4" />}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading={t('theme')}>
                        <CommandItem onSelect={() => runCommand(() => setTheme("light"))}>
                            <SunIcon className="mr-2 h-4 w-4" />
                            {t('light')}
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => setTheme("dark"))}>
                            <MoonIcon className="mr-2 h-4 w-4" />
                            {t('dark')}
                        </CommandItem>
                        <CommandItem onSelect={() => runCommand(() => setTheme("system"))}>
                            <LaptopIcon className="mr-2 h-4 w-4" />
                            {t('system')}
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}

export default CommandMenu;