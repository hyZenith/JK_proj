// AuthService.js

import AppConst from "../AppConst";

class AuthService {
    constructor() {
        this.authTokenKey = "auth_token";
        this.userDataKey = "auth_user";
        this.subscribers = []; // For state listeners
    }

    // --- Authentication ---

    async authenticate(email, password) {
        try {
            const response = await fetch(AppConst.api(AppConst.login), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                this.onLoginFailed(errorData);
                throw new Error(errorData.message || "Login failed");
            }

            const data = await response.json();
            this.saveSession(data.token, data.user);
            this.onLoginSuccess(data.user);
            return data.user;

        } catch (error) {
            this.onLoginFailed(error);
            throw error;
        }
    }

    async demo() {
        try {
            const data = {
                token: "token-test",
                user: {
                    firstName: "Demo"
                }
            };
            this.saveSession(data.token, data.user);
            this.onLoginSuccess(data.user);
            return data.user;

        } catch (error) {
            this.onLoginFailed(error);
            throw error;
        }
    }

    // --- Session Storage ---

    saveSession(token, user) {
        localStorage.setItem(this.authTokenKey, token);
        localStorage.setItem(this.userDataKey, JSON.stringify(user));
        this.notifySubscribers();
    }

    getToken() {
        return localStorage.getItem(this.authTokenKey);
    }

    getUser() {
        return JSON.parse(localStorage.getItem(this.userDataKey));
    }

    isLoggedIn() {
        return !!this.getToken();
    }

    // --- Logout ---

    logout() {
        localStorage.removeItem(this.authTokenKey);
        localStorage.removeItem(this.userDataKey);
        this.onLogout();
        this.notifySubscribers();
    }

    // --- Hooks ---

    onLoginSuccess(user) {
        console.log("Login successful:", user);
    }

    onLoginFailed(error) {
        console.error("Login failed:", error);
    }

    onLogout() {
        console.log("User logged out");
    }

    // --- Subscriptions (optional reactive updates) ---

    subscribe(callback) {
        this.subscribers.push(callback);
    }

    unsubscribe(callback) {
        this.subscribers = this.subscribers.filter(cb => cb !== callback);
    }

    notifySubscribers() {
        this.subscribers.forEach(callback => callback(this.isLoggedIn()));
    }

    // --- Authorization Header Helper ---

    getAuthHeader() {
        return this.isLoggedIn() ? { Authorization: `Bearer ${this.getToken()}` } : {};
    }
}

export const authService = new AuthService();