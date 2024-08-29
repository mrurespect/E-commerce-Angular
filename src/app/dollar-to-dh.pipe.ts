import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dollarToDh',
  standalone: true
})
export class DollarToDhPipe implements PipeTransform {

  transform(dollar: number): number {
    return dollar*9.71;
  }

}
