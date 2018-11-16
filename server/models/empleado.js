const mongoose=require('mongoose');
const {Schema} = mongoose;



const EmpleadoSchema=new Schema({
    
    nombre:{type:String,required:true},
    apellido:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    curp:{type:String, required:true, unique:true},
    nss:{type:String,required:true,unique:true},
    rfc:{type:String, required:true, unique:true},
    salario:{type:Number,required:true},
    fecha_nac:{type:String,required:true},
    fecha_contratacion:{type:String,required:true},
    sucursal:{type:String, required:true},
    puesto:{type:String,required:true},
    direccion:{
    calle:{type:String,require:true},
    num_ext: {type:String,required:true},
    cp:{type:String, require:true},
    colonia:{type:String,required:true},
    },
    telefono:{type:String,required:true},
    password:{type:String,required:true},
    status:{type:String,required:true}
    

});

module.exports=mongoose.model('Empleado',EmpleadoSchema);