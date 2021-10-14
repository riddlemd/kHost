export class Singer {

    name: string;

    id?: number;

    lastSang?: Date;

    constructor({
        name,
        id,
        lastSang
    }: parameters) {
        this.name = name;
        this.id = id;
        this.lastSang = lastSang;
    }
}

interface parameters {
    name: string,
    id: number,
    lastSang?: Date
}