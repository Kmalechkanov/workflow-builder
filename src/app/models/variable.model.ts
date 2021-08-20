import { FieldMeta } from "./field-meta.model";
import { Schema } from "./schema.model";

export class Variable {
    name!: string;
    required: boolean = false;
    isInput!: boolean;
    isOutput!: boolean;
    schema!: Schema;
    meta!: FieldMeta;
}
