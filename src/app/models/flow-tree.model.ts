import { Flow } from "./flow.model";

export class FlowTree {
    root!: string;
    data?: Flow | null;
    branches?: FlowTree[];
}