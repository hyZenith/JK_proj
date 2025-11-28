export default class BrowserUtility {

    // Getter for browser language
    static get browserLanguage() {
        return navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || 'Unknown';
    }

    // Getter for user agent
    static get userAgent() {
        return navigator.userAgent || 'Unknown';
    }

    // You can add more getters for other metadata if needed
    // For example, getter for browser platform
    static get browserPlatform() {
        return navigator.platform || 'Unknown';
    }

    // Getter for cookies enabled status
    static get areCookiesEnabled() {
        return navigator.cookieEnabled;
    }

    // Getter for screen width
    static get screenWidth() {
        return window.screen.width || 'Unknown';
    }

    // Getter for screen height
    static get screenHeight() {
        return window.screen.height || 'Unknown';
    }

    // Getter for user's country code
    static getUserCountryCode() {
        return new Promise((resolve, reject) => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        const apiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

                        fetch(apiUrl)
                            .then(response => response.json())
                            .then(data => resolve(data.countryCode || 'Unknown'))
                            .catch(error => reject(error));
                    },
                    (error) => {
                        console.error('Error getting user location:', error);
                        reject(error);
                    }
                );
            } else {
                reject(new Error('Geolocation is not supported by this browser.'));
            }
        });
    }
}
