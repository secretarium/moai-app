import path from 'path';
import NextI18Next from 'next-i18next';
import NextConfig from 'next/config';

const localeSubpaths: Record<string, string> = NextConfig().publicRuntimeConfig.localeSubpaths;

export const NextI18N = new NextI18Next({
    defaultNS: 'common',
    defaultLanguage: 'fr',
    otherLanguages: ['en'],
    localeSubpaths,
    localePath: path.resolve('./public/static/locales')
});

export default NextI18N as typeof NextI18N;