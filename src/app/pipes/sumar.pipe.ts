import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumar'
})
export class SumarPipe implements PipeTransform {

  transform(value: number, cantidad:number): any {
    return value+cantidad;
  }

}
