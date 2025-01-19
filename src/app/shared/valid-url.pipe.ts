import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validUrl',
})
export class ValidUrlPipe implements PipeTransform {
  transform(value: string): boolean {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?(www\\.)?' + // protocol and www
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // fragment locator
    return !!urlPattern.test(value);
  }
}
