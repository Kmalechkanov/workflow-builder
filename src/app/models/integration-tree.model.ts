import { IntegrationServiceModel as IntegrationService } from "./integration-service.model";

export class IntegrationTree {
    name!: string;
    folders?: IntegrationTree[];
    services?: IntegrationService[];
}