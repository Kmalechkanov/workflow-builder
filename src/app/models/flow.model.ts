import { BaseModel } from "./base-model.model";

export class Flow extends BaseModel {
    path!: string;
    name!: string;
    displayName?: string;
    description?: string;

}