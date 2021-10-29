import { ModelWithId } from "./ModelWIthId";
import { ModelWithPosition } from "./ModelWithPosition";
import { Singer } from "./Singer";

export class QueuedSinger implements ModelWithId, ModelWithPosition {

  id?: number;

  singerId?: number;
    
  singer?: Singer;
  
  queuedSongsCount: number = 0;

  position: number = 0;
}