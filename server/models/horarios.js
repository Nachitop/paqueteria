const mongoose=require('mongoose');
const {Schema}= mongoose;

const HorariosSchema= new Schema({
    dia:{type:String, required:true},
    desde:{type:String,required:true},
    hasta:{type:String, required:true},
    status:{type:String,required:true}
});

module.exports=mongoose.model('Horarios',HorariosSchema)