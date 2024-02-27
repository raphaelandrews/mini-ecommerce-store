"use client"

import { useTranslations } from 'next-intl';

const NoResults = () => {
  const t = useTranslations('NoResults');

  return ( 
    <div className="flex items-center justify-center h-full w-full text-neutral-500">
      {t('noResults')}
    </div>
   );
};

export default NoResults;
