const mongoose=require('mongoose');
const {Schema}=mongoose;

const ServicioSchema= new Schema({
    nombre:{type:String, required:true},
    porcentaje:{type:Number,required:true},
    status:{type:String, required:true}
});

module.exports=mongoose.model('Servicio',ServicioSchema);