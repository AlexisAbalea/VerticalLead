import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validUrl',
})
export class ValidUrlPipe implements PipeTransform {
  transform(value: string): boolean {
    let url;

    try {
      url = new URL(value);
    } catch (_) {
      return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
  }
}
