



export default class AppConst {
    static api(endpoint) {
        return AppConst.baseUrl + endpoint;
    };

    static get baseUrl() {
        const url = new URL(window.location.href);
        if (url.hostname.includes('gotradeturkiye.com')) {
            return 'https://api.gotradeturkiye.com/api/';
        } else {
            return "http://localhost:3000/api/";
        }
    }

    static brandName= "Go Trade Türkiye";

    // API endpoints
    static login = "login";
    static register = "register";
    static becomeMember = "become-member";
    static mainMenu = "main-menu";
    static claimBusiness = "claim-business";
    static search = "search";
    static searchProducts = "products/search";
    static deleteProduct = "product";
    static searchManufacturers = "manufacturer/search";
    static promotedManufacturers = "manufacturer/promoted";
    static homepageManufacturers = "manufacturer/homepage";
    static manufacturerPhoneNumber = "manufacturer/phone";
    static manufacturerSocial = "manufacturer/social";
    static manufacturerWebsite = "manufacturer/website";
    static manufacturerReviews = "manufacturer/reviews";
    static bookmarkManufacturer = "manufacturer/bookmark";
    static bookmarkedManufacturer = "manufacturer/bookmarks";
    static manufacturer = "manufacturer";
    static product = "product";
    static relatedProduct = "products/related";
    static bookmarkProduct = "products/bookmark";
    static bookmarkedProduct = "products/bookmarks";
    static homePageCategories = "categories/home";

    // dashboard API
    static customerInquiries = "customer/inquiries";

    static footerMenu = "menu/footer";


    static defaultLang = "en-US";
    static languages = {
        "en-us": "English (United States)",
        "en-gb": "English (United Kingdom)",
        "fr-fr": "Français (France)",
        "fr-ca": "Français (Canada)",
        "es-es": "Español (España)",
        "es-mx": "Español (México)",
        "pt-br": "Português (Brasil)",
        "pt-pt": "Português (Portugal)",
        "de-de": "Deutsch (Deutschland)",
        "it-it": "Italiano (Italia)",
        "ja-jp": "日本語 (日本)",
        "ko-kr": "한국어 (대한민국)",
        "tr-tr": "Türkçe (Türkiye)",
        "vi-vn": "Tiếng Việt (Việt Nam)",
        "th-th": "ไทย (ประเทศไทย)",
        "pl-pl": "Polski (Polska)",
        "nl-nl": "Nederlands (Nederland)",
        "sv-se": "Svenska (Sverige)",
        "fi-fi": "Suomi (Suomi)",
        "da-dk": "Dansk (Danmark)",
        "no-no": "Norsk (Norge)",
        "cs-cz": "Čeština (Česko)",
        "hu-hu": "Magyar (Magyarország)",
        "ro-ro": "Română (România)",
        "bg-bg": "Български (България)",
        "el-gr": "Ελληνικά (Ελλάδα)",
        "ar-sa": "العربية (السعودية)",
        "zh-cn": "中文 (中国)",      // Simplified
        "zh-tw": "中文 (台灣)",      // Traditional
        "ru-ru": "Русский (Россия)",
        "hi-in": "हिन्दी (भारत)",
        "id-id": "Bahasa Indonesia (Indonesia)"
    };
}