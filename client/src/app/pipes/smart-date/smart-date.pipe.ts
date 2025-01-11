import { DatePipe } from '@angular/common';
import { inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { isDefined } from 'simple-bool';

@Pipe({
  name: 'smartDate',
})
export class SmartDatePipe implements PipeTransform {
  private readonly locale = inject(LOCALE_ID);
  private readonly datePipe = new DatePipe(this.locale);

  /**
   * Formats a date into a common format. Doesn't display the year if it is the same as the current year (and is not in the future).
   * @param value The date to be displayed.
   * @returns A string with the formatted date.
   */
  transform(value: Date | undefined | null): string | null {
    if (!isDefined(value)) return null;
    if (value.getFullYear() === new Date().getFullYear() && value <= new Date()) {
      return this.datePipe.transform(value, $localize`:@@smart-date-format.short:MMM d`);
    }
    return this.datePipe.transform(value, $localize`:@@smart-date-format.full:MMM d, yyyy`);
  }
}
