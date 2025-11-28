import AppConst from "../AppConst";
import BrowserUtility from "./BrowserUtility";
import CookieStorage from "./CookieStorage";

export default class TranslateUtility {
    static translations = {};
    static currentLang = null;

    static getLang(urlParams) {
        if (urlParams !== undefined && urlParams['lang']) {
            return urlParams['lang'];
        }

        if (CookieStorage.has('lang')) {
            return CookieStorage.get('lang');
        }

        return BrowserUtility.browserLanguage;
    }

    static setLang(lang) {
        if (CookieStorage.has('lang')) {
            const oldLang = CookieStorage.get('lang');
            if (oldLang !== lang) {
                CookieStorage.set('lang', lang.trim());
                window.dispatchEvent(new Event('language-changed'));
            } else {
                CookieStorage.set('lang', lang.trim());
            }
        } else {
            CookieStorage.set('lang', lang.trim());
            window.dispatchEvent(new Event('language-changed'));
        }
    }

    static async load(lang) {
        if (this.currentLang === lang) return;

        const langCode = lang.toLowerCase();
        const fallback = AppConst.defaultLang;

        try {
            const langFile = (await import(`../translations/${langCode}.json`)).default;
            this.translations = langFile;
            this.currentLang = langCode;
        } catch (error) {
            console.warn(`Translation for "${langCode}" not found. Falling back to English.`);

            try {
                const fallbackFile = (await import(`../translations/${fallback}.json`)).default;
                this.translations = fallbackFile;
                this.currentLang = fallback;
            } catch (fallbackError) {
                console.error('Failed to load fallback language file (en-us)', fallbackError);
                this.translations = {};
                this.currentLang = null;
            }
        }
    }

    static t(key, transMap = {}) {
        const value = this.translations?.[key];

        if (value) {
            return value.replace(/%\w+%/g, (match) => {
                const variable = match.replace(/%/g, '');
                return transMap[variable] ?? match;
            });
        }

        console.warn(`Missing translation key: "${key}"`);
        return `~${key}`;
    }
}