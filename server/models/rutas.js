const mongoose=require('mongoose');
const {Schema}=mongoose;

const RutaSchema= new Schema({
    descripcion:{type:String,required:true},
    tipo_ruta:{type:String,required:true},
    duracion_hrs:{type:Number,required:true},
    status:{type:String,required:true}
});

module.exports=mongoose.model('Ruta',RutaSchema);