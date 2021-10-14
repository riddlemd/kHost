import { Singer } from "./Singer";

export class QueuedSinger {

  singerId: number;
    
  singer?: Singer;
  
  id?: number;
  
  queuedSongsCount: number;

  constructor({
    singerId,
    singer,
    id,
    queuedSongsCount
  }: parameters) {
    this.singerId = singerId;
    this.singer = singer;
    this.id = id;
    this.queuedSongsCount = queuedSongsCount ?? 0;
  }
}

interface parameters {
  singerId: number,
  singer: Singer,
  id: number,
  queuedSongsCount?: number
}