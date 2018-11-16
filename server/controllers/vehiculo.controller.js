const vehiculoCtrl={};
const Vehiculo=require('..//models/vehiculo');

vehiculoCtrl.getVehiculo=async(req,res)=>{
    const vehiculo=await Vehiculo.findById(req.params._id);
    res.json(vehiculo);
}

vehiculoCtrl.getVehiculos=async(req,res)=>{
    const vehiculos= await Vehiculo.find();
    res.json(vehiculos);
}

vehiculoCtrl.createVehiculo=async(req,res)=>{
    delete req.body._id
    const vehiculo= new Vehiculo(req.body);
    await vehiculo.save();
    res.json({mensaje:"Vehículo Guardado"});
}

vehiculoCtrl.editVehiculo=async(req,res)=>{
    console.log(req.body);
    delete req.body._id
    await Vehiculo.findByIdAndUpdate(req.params._id,{$set:req.body},{$new:true})
    res.json({mensaje:"Vehículo Actualizado"});
}

vehiculoCtrl.deleteVehiculo=async(req,res)=>{
    await Vehiculo.findByIdAndRemove(req.params._id);
}

vehiculoCtrl.validarVehiculo=async(req,res)=>{
    const vehiculo= await Vehiculo.findOne({matricula:req.params.matricula});
    var exists;
    if(vehiculo!=null || vehiculo!=undefined){
        exists=1;
    }else{
        exists=0;
    }
    res.json(exists);
}

module.exports=vehiculoCtrl;