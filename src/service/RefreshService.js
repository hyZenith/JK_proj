class RefreshService {
    constructor() {
        // Map of name => Set of callbacks
        this.callbacks = new Map();
    }

    // Subscribe a callback under a name
    subscribe(name, callback) {
        if (!this.callbacks.has(name)) {
            this.callbacks.set(name, new Set());
        }
        this.callbacks.get(name).add(callback);

        // Return unsubscribe function
        return () => this.unsubscribe(name, callback);
    }

    // Remove a specific callback under a name
    unsubscribe(name, callback) {
        const set = this.callbacks.get(name);
        if (set) {
            set.delete(callback);
            if (set.size === 0) {
                this.callbacks.delete(name);
            }
        }
    }

    // Trigger all callbacks under a specific name
    trigger(name, data) {
        const set = this.callbacks.get(name);
        if (set) {
            set.forEach((cb) => cb(data));
        }
    }

    // Optional: clear all callbacks under a name
    clear(name) {
        this.callbacks.delete(name);
    }
}

// Singleton instance
export const refreshService = new RefreshService();
