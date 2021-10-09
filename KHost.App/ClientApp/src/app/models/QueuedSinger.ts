import { Singer } from "./Singer";

export class QueuedSinger
{
  id: number = -1;
  singerId: number | null = null;
  
  singer: Singer | null = null;
}