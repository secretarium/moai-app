import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { I18nManager } from 'react-native';
import en from './locales/en.json';
import fr from './locales/fr.json';
import pl from './locales/pl.json';

export const initLocalize = (): void => {
    i18n.fallbacks = true;
    i18n.translations = { fr, en, pl };
    i18n.locale = Localization.locale;
    I18nManager.forceRTL(false);
    I18nManager.allowRTL(false);
};