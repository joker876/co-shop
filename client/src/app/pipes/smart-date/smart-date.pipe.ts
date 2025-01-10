import { DatePipe } from '@angular/common';
import { inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { isDefined } from 'simple-bool';

@Pipe({
  name: 'smartDate'
})
export class SmartDatePipe implements PipeTransform {
  private readonly locale = inject(LOCALE_ID);
  private readonly datePipe = new DatePipe(this.locale);

  transform(value: Date | undefined | null): string | null {
    if (!isDefined(value)) return null;
    if (value.getFullYear() === new Date().getFullYear()) {
      return this.datePipe.transform(value, $localize`:@@smart-date-format.short:MMM d`);
    }
    return this.datePipe.transform(value, $localize`:@@smart-date-format.full:MMM d, yyyy`);
  }
}
