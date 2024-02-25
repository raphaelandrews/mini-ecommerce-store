import { Inter } from 'next/font/google';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { ClerkProvider } from '@clerk/nextjs';

import './globals.css'
import ModalProvider from '@/providers/modal-provider/modal-provider';
import ToastProvider from '@/providers/toast-provider';

import CategoriesList from '@/components/categories-list'
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pt" }, { locale: "es" }];
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
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ClerkProvider>
        <html lang={locale}>
          <body className={font.className}>
              <ToastProvider />
              <ModalProvider />
              <header>
                <Navbar />
              </header>
              <CategoriesList />
              {children}
            <Footer />
          </body>
        </html>
      </ClerkProvider>
    </NextIntlClientProvider>
  )
}