export class Flow {
    id!: number;
    name!: string;
    path!: string;
    process!: Process;
    meta!: FlowMeta;
}

export class Process {
    variables!: Variable[];
}

export class Variable {
    name!: string;
    required: boolean = false;
    isInput!: boolean;
    isOutput!: boolean;
    schema!: Schema;
    meta!: FieldMeta;
}

export class Schema {
    type!: string;
}

export class FieldMeta {
    displayName!: string;
    description?: string;
}

export class FlowMeta {
    type!: string;
    info!: string;
}