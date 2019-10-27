import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "minutesConverter"
})
export class MinutesConverterPipe implements PipeTransform {
  transform(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const leftMins = minutes % 60;
    return `${hours >= 1 ? hours + "h " : ""}${leftMins}min`;
  }
}
