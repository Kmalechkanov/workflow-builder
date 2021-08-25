import { BaseModel } from "../base-model.model";
import { AuthschemaSchema } from "./authschema-schema.model";

export class Authschema extends BaseModel {
    serviceName!: string;
    title!: string;
    schema!: AuthschemaSchema;
}   