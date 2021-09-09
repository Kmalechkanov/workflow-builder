import { BaseModel } from "../base-model.model";
import { User } from "../user.model";

export class Authentication extends BaseModel {
    userId!: number;
    user?: User;
    name!: string;
    description!: string;
    serviceName!: string;
    data!: object;
}