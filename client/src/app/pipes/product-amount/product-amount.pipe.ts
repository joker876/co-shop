import { Pipe, PipeTransform } from '@angular/core';
import { ProductUnit } from '@shared/interfaces/product/product';
import { roundToPrecision } from 'more-rounding';

const UNIT_MAP_SINGLE: Record<ProductUnit, string> = {
  [ProductUnit.Piece]: $localize`:@@product.unit.singular.pc:pc.`,
  [ProductUnit.Box]: $localize`:@@product.unit.singular.box:box`,
  [ProductUnit.Kilogram]: $localize`:@@product.unit.singular.kg:kg`,
  [ProductUnit.Decagram]: $localize`:@@product.unit.singular.dag:dag`,
  [ProductUnit.Gram]: $localize`:@@product.unit.singular.g:g`,
  [ProductUnit.Pound]: $localize`:@@product.unit.singular.lb:lb`,
  [ProductUnit.Ounce]: $localize`:@@product.unit.singular.oz:oz`,
  [ProductUnit.Liter]: $localize`:@@product.unit.singular.l:l`,
  [ProductUnit.Milliliter]: $localize`:@@product.unit.singular.ml:ml`,
  [ProductUnit.FluidOunce]: $localize`:@@product.unit.singular.floz:fl oz`,
  [ProductUnit.Gallon]: $localize`:@@product.unit.singular.gal:gal`,
};

const UNIT_MAP_PLURAL: Partial<Record<ProductUnit, string>> = {
  [ProductUnit.Piece]: $localize`:@@product.unit.plural.pc:pcs`,
  [ProductUnit.Box]: $localize`:@@product.unit.plural.box:boxes`,
  [ProductUnit.Kilogram]: $localize`:@@product.unit.plural.kg:kg`,
  [ProductUnit.Decagram]: $localize`:@@product.unit.plural.dag:dag`,
  [ProductUnit.Gram]: $localize`:@@product.unit.plural.g:g`,
  [ProductUnit.Pound]: $localize`:@@product.unit.plural.lb:lbs`,
  [ProductUnit.Ounce]: $localize`:@@product.unit.plural.oz:oz`,
  [ProductUnit.Liter]: $localize`:@@product.unit.plural.l:l`,
  [ProductUnit.Milliliter]: $localize`:@@product.unit.plural.ml:ml`,
  [ProductUnit.FluidOunce]: $localize`:@@product.unit.plural.floz:fl oz`,
  [ProductUnit.Gallon]: $localize`:@@product.unit.plural.gal:gal`,
};

@Pipe({
  name: 'productAmount',
})
export class ProductAmountPipe implements PipeTransform {
  /**
   * Combines an amount and a unit into one human-readable string.
   * @param amount The amount to be displayed
   * @param unit The unit type to be used
   * @returns A string with the amount and unit in a human-readable format.
   */
  transform(amount: number, unit: ProductUnit): string {
    const unitStr = amount === 1 ? UNIT_MAP_SINGLE[unit] : UNIT_MAP_PLURAL[unit];
    return `${roundToPrecision(amount, 3)} ${unitStr}`;
  }
}
