const servicioCtrl={};
const Servicio=require('../models/servicio');
var ObjectId = require('mongodb').ObjectID;

servicioCtrl.getServicio=async(req,res)=>{
   
    const servicio=await Servicio.findById(ObjectId(req.params._id));
    res.json(servicio);
}


servicioCtrl.getServicios=async(req,res)=>{
    const servicios= await Servicio.find();
    res.json(servicios);
}

servicioCtrl.createServicio=async(req,res)=>{
    delete req.body._id
    const servicio= new Servicio(req.body);
    await servicio.save();
    res.json({mensaje:"Servicio Guardado"});
}

servicioCtrl.editServicio=async(req,res)=>{
    delete req.body_id;
    await Servicio.findByIdAndUpdate(req.params._id,{$set:req.body},{$new:true});
    res.json({mensaje:"Servicio Actualizado"});
}

servicioCtrl.deleteServicio=async(req,res)=>{
    await Servicio.findByIdAndDelete(req.params._id)
}

module.exports=servicioCtrl;