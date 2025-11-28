export default class CookieStorage {

    // Function to get the current main domain
    static getDomain() {
        const hostname = window.location.hostname;
        // If on a subdomain, remove the subdomain part
        const domainParts = hostname.split('.');
        if (domainParts.length > 2) {
            return '.' + domainParts.slice(-2).join('.');
        }
        return hostname; // if already at the main domain (e.g., 'webinify.com')
    }

    // Function to add a cookie
    static set(name, value, days = 180) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const domain = CookieStorage.getDomain(); // get the current main domain
        document.cookie = `${name}=${encodeURIComponent(JSON.stringify(value))};expires=${date.toUTCString()};path=/;domain=${domain}`;
    }

    // Function to delete a cookie
    static remove(name) {
        const domain = CookieStorage.getDomain(); // get the current main domain
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=${domain}`;
    }

    // Function to get the value of a cookie by key
    static get(key) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(key + '=')) {
                try {
                    return JSON.parse(decodeURIComponent(cookie.substring(key.length + 1)));
                } catch (e) {
                    console.error("Error parsing cookie value:", e);
                    return null;
                }
            }
        }
        return null;
    }


    // Function to check if a cookie with the given key exists
    static has(key) {
        return document.cookie.split(';').some(cookie => cookie.trim().startsWith(key + '='));
    }

    static safeSet(key, value) {
        if (!CookieStorage.has(key)) {
            return CookieStorage.set(key, value);
        }
        return false;
    }

    // Function to get all cookies as an object
    static getAll() {
        const cookies = document.cookie.split(';');
        const result = {};

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            const separatorIndex = cookie.indexOf('=');

            if (separatorIndex > -1) {
                const key = cookie.substring(0, separatorIndex).trim();
                const value = cookie.substring(separatorIndex + 1).trim();

                try {
                    result[key] = JSON.parse(decodeURIComponent(value));
                } catch (e) {
                    result[key] = decodeURIComponent(value); // fallback to plain string
                }
            }
        }

        return result;
    }

}
