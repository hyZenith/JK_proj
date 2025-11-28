export default class EntitySchema {
    constructor(object) {
        this.schema = object.schema;
        this.version = object.version;
    }
}

export class EntitySchemaList {
    constructor(schemas) {
        this.schemas = schemas;
    }

    groupByVersion() {
        return this.schemas.reduce((grouped, entitySchema) => {
            // Check if a group for this version already exists, otherwise create it
            if (!grouped[entitySchema.version]) {
                grouped[entitySchema.version] = [];
            }
            // Push the current schema to the corresponding version group
            grouped[entitySchema.version].push(entitySchema);
            return grouped;
        }, {});
    }
}
