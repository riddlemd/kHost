import { ModelWithId } from "./ModelWIthId";

export class Singer implements ModelWithId {

    id?: number;

    name: string = '';

    notes: string = '';

    lastSang?: Date;
}