

export default class StateRepository {

    static runOnce(uniqueKey, callback) {
        // Check if it's already executed
        const hasRun = localStorage.getItem(uniqueKey);

        if (!hasRun) {
            // Execute the logic
            callback();

            // Store flag to avoid running again
            localStorage.setItem(uniqueKey, 'true');
        }
    }


}