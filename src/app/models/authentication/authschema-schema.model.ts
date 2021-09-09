import { AuthchemaProperties } from "./authchema-properties.model";

export class AuthschemaSchema {
    type!: string;
    title!: string;
    properties!: AuthchemaProperties;
    required!: string[];
}
