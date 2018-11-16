const sucursalCtrl={};
const Sucursal=require('../models/sucursal');

sucursalCtrl.getSucursal=async(req,res)=>{
    const sucursal= await Sucursal.findById(req.params._id);
    res.json(sucursal);
}

sucursalCtrl.getSucursales=async(req,res)=>{
    const sucursales= await Sucursal.find();
    res.json(sucursales);
}
sucursalCtrl.createSucursal=async(req,res)=>{
    
    const sucursal= new Sucursal({
        clave:req.body.clave,
        nombre: req.body.nombre,
        direccion:{
        calle:req.body.calle,
        num_ext:req.body.num_ext ,
        cp:req.body.cp,
        colonia:req.body.colonia,
        },
        telefono:req.body.telefono,
        encargado:req.body.encargado,
        status:req.body.status  
     });
    await sucursal.save()
    res.json({
        mensaje:"Sucursal guardada"}
    );
}

sucursalCtrl.editSucursal=async(req,res)=>{
    
    const {_id} = req.params;
    const sucursal={
        clave:req.body.clave,
        nombre:req.body.nombre,
        direccion:{
        calle:req.body.calle,
        num_ext: req.body.num_ext,
        cp:req.body.cp,
        colonia:req.body.colonia,
        },
    
    telefono:req.body.telefono,
    encargado:req.body.encargado,
    status:req.body.status

    }
   await Sucursal.findByIdAndUpdate(_id,{$set:sucursal},{$new:true})
    res.json({mensaje:"Sucursal Actualizada"});
}
sucursalCtrl.deleteSucursal=async(req,res)=>{
    const {_id} = req.params;
    await Sucursal.findByIdAndRemove(_id);
    res.json({mensaje:"Sucursal Eliminada"});
}

sucursalCtrl.validarSucursal=async(req,res)=>{
    const sucursal= await Sucursal.findOne({clave:req.params.clave})
    var exists;
    if(sucursal!=null || sucursal!=undefined){
        exists=1
    }
    else{
        exists=0;
    }
    res.json(exists);
}


module.exports=sucursalCtrl;