import { Observable } from "rxjs/internal/Observable";

export class DynamicInput {
    public constructor(obj: DynamicInput) {
        this.name = obj.name;
        this.required = obj.required ? obj.required : false;
        this.type = obj.type;
        this.additionalProperties = obj.additionalProperties;
        this.items = obj.additionalProperties;
        this.properties = obj.properties;
        this.enum = obj.enum;
        this.description = obj.description;
        this.displayName = obj.displayName;
        this.authType = obj.authType;
        this.default = obj.default;
        this.format = obj.format;
    }

    name!: string;
    type!: string;
    required?: boolean;
    displayName?: string;
    description?: string;
    authType?: string;
    additionalProperties?: object;
    items?: object;
    properties?: object;
    enum?: string[] | Observable<string[]>;
    format?: string;
    default?: string;
}
