import { Singer } from "./Singer";
import { Song } from "./Song";

export class Performance {
    id: number|null = null;

    singer: Singer|null = null;

    song: Song|null = null;

    state: PerformanceState = PerformanceState.Unknown;

    timeExpiredInSeconds: number = 0;

    date: Date|null = null;
}

export enum PerformanceState {
    Unknown,
    Playing,
    Paused,
    Stopped
  }