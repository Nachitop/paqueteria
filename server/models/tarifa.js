const mongoose=require('mongoose');
const {Schema}=mongoose;

const TarifaSchema=new Schema({
    tipo_paquete:{type:String,required:true},
    dimensiones:{
        peso:{
            min:{type:Number,required:true},
            max:{type:Number,required:true}
        }  ,
        volumen:{
            min:{type:Number,required:true},
            max:{type:Number,required:true}
        }  ,
        distancia:{
            min:{type:Number,required:true},
            max:{type:Number,required:true}
        }   
    },
    precio:{
        normal:{type:Number,required:true},
        express:{type:Number,required:true}
    },
    status:{type:String,required:true}
    
});

module.exports=mongoose.model('Tarifa',TarifaSchema);