import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { I18nManager } from 'react-native';
import en from './locales/en.json';
import fr from './locales/fr.json';
import pl from './locales/pl.json';

export const i18n = new I18n();
export const initLocalize = (): void => {
    i18n.defaultLocale = 'en';
    i18n.enableFallback = true;
    i18n.translations = { fr, en, pl };
    i18n.locale = Localization.getLocales()[0].languageCode;
    I18nManager.forceRTL(false);
    I18nManager.allowRTL(false);
};