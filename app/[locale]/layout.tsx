import { Inter } from 'next/font/google';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import {unstable_setRequestLocale} from 'next-intl/server';
import { ClerkProvider } from '@clerk/nextjs';

import './globals.css'
import ModalProvider from '@/providers/modal-provider/modal-provider';
import ToastProvider from '@/providers/toast-provider';
import { ThemeProvider } from '@/providers/theme-provider';

import CategoriesList from '@/components/categories-list'
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { locales } from '@/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const font = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Store',
  description: 'Store - The place for all your purchases.',
}

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ClerkProvider>
        <html lang={locale}>
          <body className={font.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
            >
              <ToastProvider />
              <ModalProvider />
              <header>
                <Navbar />
              </header>
              <CategoriesList />
              {children}
              <Footer />
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </NextIntlClientProvider>
  )
}