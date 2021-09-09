import { FieldMeta } from "./field-meta.model";
import { FlowSchema } from "./flow-schema.model";

export class Variable {
    name!: string;
    required: boolean = false;
    isInput!: boolean;
    isOutput!: boolean;
    schema!: FlowSchema;
    meta!: FieldMeta;
}
