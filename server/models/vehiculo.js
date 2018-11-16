const mongoose=require('mongoose');
const {Schema}=mongoose;

const VehiculoSchema= new Schema({
    matricula:{type:String,required:true, unique:true},
    marca:{type:String,required:true},
    modelo:{type:String,required:true},
    tipo_vehiculo:{type:String,required:true},
    sucursal:{type:String,required:true},
    status:{type:String,required:true}
});

module.exports=mongoose.model('Vehiculo',VehiculoSchema);