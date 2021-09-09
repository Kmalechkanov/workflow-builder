import { BaseModel } from "../base-model.model";

export class Integration extends BaseModel {
    path!: string;
    name!: string;
    displayName?: string;
    description?: string;
}