/**
 * Class representing a generic repository manager for interacting with IndexedDB.
 */
export default class RepositoryManager {
    /**
     * Constructs a RepositoryManager instance.
     * 
     * @param {Promise<IDBDatabase>} indexDb - A promise that resolves to the IndexedDB instance.
     * @param {string} tableName - The name of the table (object store) to interact with.
     * @param {object} schema - The schema definition of the table.
     */
    constructor(indexDb, tableName, schema) {
        /**
         * @type {Promise<IDBDatabase>}
         * @description A promise that resolves to the IndexedDB instance.
         */
        this.indexDb = indexDb;

        /**
         * @type {string}
         * @description The name of the table (object store) to interact with.
         */
        this.tableName = tableName;

        /**
         * @type {object}
         * @description The schema definition of the table.
         */
        this.schema = schema;
    }

    static getNextVersionIfSchemaDiffers(currentFields, expectedSchema, currentVersion) {
        // Convert objects to JSON strings for easy comparison
        // Convert to JSON strings for deep comparison
        const currentSchemaStr = JSON.stringify(currentFields);
        const expectedSchemaStr = JSON.stringify(expectedSchema);

        return currentSchemaStr !== expectedSchemaStr ? currentVersion + 1 : null;
    }

    /**
     * Creates a transaction for the specified table and mode.
     * 
     * @param {string} tableName - The name of the table (object store).
     * @param {string} [mode='readonly'] - The mode of the transaction, either 'readonly' or 'readwrite'.
     * @returns {Promise<IDBObjectStore>} - The object store for the transaction.
     */
    async _getTransaction(tableName, mode = 'readonly') {
        const db = await this.indexDb; // Wait for the IndexedDB instance to resolve.
        const transaction = db.transaction(tableName, mode); // Create a transaction.
        return transaction.objectStore(tableName); // Return the object store for the transaction.
    }

    async add(object) {
        try {
            const store = await this._getTransaction(this.tableName, "readwrite");
            const request = store.add(object.toDB());

            return new Promise((resolve, reject) => {
                request.onsuccess = () => resolve(request.result);
                request.onerror = (event) => reject(event.target.error);
            });
        } catch (error) {
            console.error("Error adding object:", error);
            throw error;
        }
    }

    async addAll(objects) {
        try {
            const results = [];
            for (const obj of objects) {
                const result = await this.add(obj);
                results.push(result);
            }
            return results;
        } catch (error) {
            console.error("Error adding objects:", error);
            throw error;
        }
    }

    async updateAll(objects) {
        try {
            const results = [];
            for (const obj of objects) {
                const result = await this.update(obj);
                results.push(result);
            }
            return results;
        } catch (error) {
            console.error("Error adding objects:", error);
            throw error;
        }
    }

    async getAll() {
        try {
            const store = await this._getTransaction(this.tableName);
            const request = store.getAll();

            return new Promise((resolve, reject) => {
                request.onsuccess = () => resolve(request.result);
                request.onerror = (event) => reject(event.target.error);
            });
        } catch (error) {
            console.error("Error fetching all objects:", error);
            throw error;
        }
    }

    async getBy(criteria) {
        try {
            const store = await this._getTransaction(this.tableName);
            const result = [];
            const request = store.openCursor();

            return new Promise((resolve, reject) => {
                request.onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        if (Object.entries(criteria).every(([key, value]) => cursor.value[key] === value)) {
                            result.push(cursor.value);
                        }
                        cursor.continue();
                    } else {
                        resolve(result);
                    }
                };

                request.onerror = (event) => reject(event.target.error);
            });
        } catch (error) {
            console.error("Error fetching objects by criteria:", error);
            throw error;
        }
    }

    async findOneBy(criteria) {
        try {
            const store = await this._getTransaction(this.tableName);
            const request = store.openCursor();

            return new Promise((resolve, reject) => {
                request.onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        if (Object.entries(criteria).every(([key, value]) => cursor.value[key] === value)) {
                            resolve(cursor.value); // Resolve with the first match
                            return; // Stop further iteration
                        }
                        cursor.continue(); // Continue to the next record
                    } else {
                        resolve(null); // No match found
                    }
                };

                request.onerror = (event) => reject(event.target.error);
            });
        } catch (error) {
            console.error("Error fetching object by criteria:", error);
            throw error;
        }
    }


    /**
     * Deletes an object from the object store by its key.
     * 
     * @param {any} key - The primary key of the object to delete.
     * @returns {Promise<undefined>} - A promise that resolves when the object is successfully deleted.
     * @throws {Error} - Throws an error if the transaction or delete operation fails.
     */
    async delete(key) {
        try {
            // Get the object store with readwrite permissions
            const store = await this._getTransaction(this.tableName, "readwrite");

            // Initiate the delete request for the specified key
            const request = store.delete(key);

            // Return a promise that resolves or rejects based on the request outcome
            return new Promise((resolve, reject) => {
                request.onsuccess = () => {
                    // Resolve the promise when the delete operation is successful
                    resolve(request.result);
                };

                request.onerror = (event) => {
                    // Reject the promise with the error when the delete operation fails
                    reject(event.target.error);
                };
            });
        } catch (error) {
            // Log and rethrow any errors encountered during the process
            console.error("Error deleting object:", error);
            throw error;
        }
    }


    async deleteAll() {
        try {
            const store = await this._getTransaction(this.tableName, "readwrite");
            const request = store.clear();

            return new Promise((resolve, reject) => {
                request.onsuccess = () => resolve(request.result);
                request.onerror = (event) => reject(event.target.error);
            });
        } catch (error) {
            console.error("Error deleting all objects:", error);
            throw error;
        }
    }

    async update(object) {
        try {
            const store = await this._getTransaction(this.tableName, "readwrite");
            const request = store.put(object.toDB());

            return new Promise((resolve, reject) => {
                request.onsuccess = () => resolve(request.result);
                request.onerror = (event) => reject(event.target.error);
            });
        } catch (error) {
            console.error("Error updating object:", error);
            throw error;
        }
    }

    /**
     * Updates objects in the object store that match the given criteria.
     * 
     * @param {object} criteria - The criteria to match objects for updating.
     * @param {object} updateData - The data to update in matched objects.
     * @returns {Promise<number>} - A promise that resolves to the number of updated objects.
     * @throws {Error} - Throws an error if the transaction or update operation fails.
     */
    async updateBy(criteria, updateData) {
        try {
            const store = await this._getTransaction(this.tableName, "readwrite");
            const request = store.openCursor();
            let updatedCount = 0;

            return new Promise((resolve, reject) => {
                request.onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        // Check if the current record matches the criteria
                        if (Object.entries(criteria).every(([key, value]) => cursor.value[key] === value)) {
                            const updatedObject = { ...cursor.value, ...updateData.toDB() };
                            cursor.update(updatedObject);
                            updatedCount++;
                        }
                        cursor.continue();
                    } else {
                        resolve(updatedCount);
                    }
                };

                request.onerror = (event) => reject(event.target.error);
            });
        } catch (error) {
            console.error("Error updating objects by criteria:", error);
            throw error;
        }
    }

}
