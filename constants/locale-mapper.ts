export const LOCALE_MAPPER = {
  'pt-br': {
    code: 'pt-BR',
    name: 'Português',
  },
  en: {
    code: 'en',
    name: 'English',
  },
};

export const getLocaleName = (localeCode: string) => {
  return (
    LOCALE_MAPPER[localeCode as keyof typeof LOCALE_MAPPER]?.name || 'Português'
  );
};
