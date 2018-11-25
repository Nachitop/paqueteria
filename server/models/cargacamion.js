const mongoose=require('mongoose');
const {Schema}= mongoose;

const CargaCamionSchema= new Schema({
    empleado:{type:Schema.Types.ObjectId,ref:'Empleado',required:true},
    vehiculo:{type:Schema.Types.ObjectId,ref:'Vehiculo',required:true},
    ruta:{type:Schema.Types.ObjectId,ref:'Ruta',required:true},
    fecha:{type:String},
    fecha_termino:{type:String},
    sucursal:{type:String,required:true},
    envios:[{type:Schema.Types.ObjectId,ref:'Envio'}],
    status:{type:String,required:true}

});

module.exports=mongoose.model('CargaCamion',CargaCamionSchema)
