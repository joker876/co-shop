import { DatePipe } from '@angular/common';
import { inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smartDate'
})
export class SmartDatePipe implements PipeTransform {
  private readonly locale = inject(LOCALE_ID);
  private readonly datePipe = new DatePipe(this.locale);

  transform(value: Date): string | null {
    if (value.getFullYear() === new Date().getFullYear()) {
      return this.datePipe.transform(value, 'MMM d');
    }
    return this.datePipe.transform(value, 'MMM d, yyyy');
  }
}
