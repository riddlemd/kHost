import { ModelWithId } from "./ModelWIthId";

export class Venue implements ModelWithId {

    public id?: number;

    name: string = "";

    notes: string = "";
}