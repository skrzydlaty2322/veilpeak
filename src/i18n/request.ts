import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  const locale = (await cookies()).get('NEXT_LOCALE')?.value ?? 'en';
  const validLocales = ['en', 'pl'];
  const safeLocale = validLocales.includes(locale) ? locale : 'en';
  return {
    locale: safeLocale,
    messages: (await import(`./${safeLocale}.json`)).default,
  };
});
