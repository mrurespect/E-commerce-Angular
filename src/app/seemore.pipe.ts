import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seemore',
  standalone: true
})
export class SeemorePipe implements PipeTransform {
  transform(description: string, number_of_words:number,original?:boolean): string {
    if (original)return description;
    return description.split(" ").slice(0,number_of_words).join("  ");
  }

}
