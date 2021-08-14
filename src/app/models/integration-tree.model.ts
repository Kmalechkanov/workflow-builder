import { Integration } from "./integration.model";

export class IntegrationTree {
    root!: string;
    data?: Integration | null;
    branches?: IntegrationTree[];
}