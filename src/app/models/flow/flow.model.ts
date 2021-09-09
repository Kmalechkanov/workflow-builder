import { FlowMeta } from "./flow-meta.model";
import { Process } from "./process.model";

export class Flow {
    id!: number;
    name!: string;
    path!: string;
    process!: Process;
    meta!: FlowMeta;
}