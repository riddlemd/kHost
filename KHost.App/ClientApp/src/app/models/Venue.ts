export class Venue {

    name: string;

    id?: number;

    address: string;

    constructor({
        name,
        id,
        address
    }: parameters) {
        this.name = name;
        this.id = id,
        this.address = address ?? '';
    }
}

interface parameters {
    name: string,
    id?: number,
    address?: string
}