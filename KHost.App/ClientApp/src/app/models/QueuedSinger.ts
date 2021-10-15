import { Singer } from "./Singer";

export class QueuedSinger {

  singerId: number;
    
  singer?: Singer;
  
  id?: number;
  
  queuedSongsCount: number;

  position: number;

  constructor({
    singerId,
    singer,
    id,
    queuedSongsCount,
    position
  }: parameters) {
    this.singerId = singerId;
    this.singer = singer;
    this.id = id;
    this.queuedSongsCount = queuedSongsCount ?? 0;
    this.position = position ?? 1;
  }
}

interface parameters {
  singerId: number,
  singer: Singer,
  id: number,
  queuedSongsCount?: number,
  position?: number
}