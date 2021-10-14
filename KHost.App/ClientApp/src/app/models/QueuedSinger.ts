import { Singer } from "./Singer";

export class QueuedSinger
{
  id: number = -1;

  singerId: number | null = null;

  queuedSongsCount: number = 0;

  singer: Singer | null = null;
}