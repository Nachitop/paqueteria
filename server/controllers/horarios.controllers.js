const horariosCtrl={};
const Horarios=require('../models/horarios');

horariosCtrl.getHorarios=async(req,res)=>{
    const horarios= await Horarios.find({status:'Activo'});
    res.json(horarios)
}

horariosCtrl.createHorario=async(req,res)=>{
    delete req.body._id
    const horario= new Horarios(req.body)
    horario.save();
    res.json({mensaje:"Horario creado con exito!"})
}
module.exports=horariosCtrl;