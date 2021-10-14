import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'secondsToMinutes'
})
export class SecondsToMinutesPipe implements PipeTransform {
    transform(seconds: number | undefined | undefined): string {
        seconds ??= 0;
        const minutes: number = Math.floor(seconds / 60);
        const minutesString = minutes.toString().padStart(2, '0');
        const secondsString = Math.floor(seconds - minutes * 60).toString().padStart(2, '0');
        return minutesString + ':' + secondsString;
    }
}