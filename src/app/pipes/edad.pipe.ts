import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edad'
})
export class EdadPipe implements PipeTransform {
  
  transform(value: any, args?: any): any {
    var birthday:any = new Date(value);
    var today:any = new Date();
    var age = ((today - birthday) / (31557600000));
    var age = Math.floor( age );
    return age;

   
  }

}
