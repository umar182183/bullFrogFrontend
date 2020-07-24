import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: any, args?: any): any {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  // or
 // bypassSecurityTrustStyle(value: string): SafeStyle
 // bypassSecurityTrustScript(value: string): SafeScript
 // bypassSecurityTrustUrl(value: string): SafeUrl
  }

}