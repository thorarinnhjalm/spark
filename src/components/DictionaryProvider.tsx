'use client';

import React, { createContext, useContext } from 'react';
import type { Locale } from '@/dictionaries';

type Dictionary = any; // We can type this strictly later, for now we pass the JSON

interface DictionaryContextType {
  dict: Dictionary;
  lang: Locale;
}

const DictionaryContext = createContext<DictionaryContextType | null>(null);

export function DictionaryProvider({
  children,
  dict,
  lang,
}: {
  children: React.ReactNode;
  dict: Dictionary;
  lang: Locale;
}) {
  return (
    <DictionaryContext.Provider value={{ dict, lang }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error('useTranslation must be used within a DictionaryProvider');
  }
  return { t: context.dict, lang: context.lang };
}
