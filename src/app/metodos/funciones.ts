import { FormGroup, AbstractControl } from "@angular/forms";
import { async } from "q";


export class Funciones {

   

    resetForm(form:FormGroup):FormGroup{
      form.reset();
     
      return form

    }

    rellenarForm(form:FormGroup,clase:any){
      form.patchValue(clase);
      return form;
    }



    validarCampos2(res:any, control:AbstractControl){
      
      if(res==1){
        return control.setErrors({'incorrect':true});
      }
     

    }

      
  

}
