const mongoose=require('mongoose');
const {Schema}=mongoose;


const SucursalSchema=new Schema({
    //_id:false,
    clave:{type:String, required:true, unique:true},
    nombre:{type:String,require:true},
    direccion:{
        calle:{type:String,require:true},
        num_ext: {type:String,required:true},
        cp:{type:String, require:true},
        colonia:{type:String,required:true}
    },

    telefono:{type:String,required:true},
    encargado:{type:String,required:true},
    status:{type:String, required:true}
});

module.exports=mongoose.model('Sucursal',SucursalSchema);