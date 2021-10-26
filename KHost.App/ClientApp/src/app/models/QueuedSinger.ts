import { ModelWithId } from "./ModelWIthId";
import { Singer } from "./Singer";

export class QueuedSinger implements ModelWithId {

  id?: number;

  singerId?: number;
    
  singer?: Singer;
  
  queuedSongsCount: number = 0;

  position: number = 0;
}