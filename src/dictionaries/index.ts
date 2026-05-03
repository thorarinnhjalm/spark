import 'server-only';

const dictionaries = {
  is: () => import('./is.json').then((module) => module.default),
  en: () => import('./en.json').then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries.is();
};
