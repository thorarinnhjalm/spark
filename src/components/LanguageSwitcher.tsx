'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from './DictionaryProvider';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const { lang } = useTranslation();

  const toggleLanguage = () => {
    const newLang = lang === 'is' ? 'en' : 'is';
    // Replace the first path segment (the locale)
    const newPathname = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPathname);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-variant hover:bg-surface-dim transition-colors shadow-sm border border-surface-container-highest"
      title="Skipta um tungumál / Change language"
    >
      <span className="text-xl leading-none" role="img" aria-label={lang === 'is' ? 'Icelandic' : 'English'}>
        {lang === 'is' ? '🇮🇸' : '🇬🇧'}
      </span>
    </button>
  );
}
