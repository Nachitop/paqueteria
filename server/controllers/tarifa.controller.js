const tarifaCtrl={};
const Tarifa=require('..//models/tarifa');

tarifaCtrl.getTarifa=async(req,res)=>{
    const tarifa=await Tarifa.findById(req.params._id);
    res.json(tarifa);
}

tarifaCtrl.getTarifas=async(req,res)=>{
    const tarifas= await Tarifa.find();
    res.json(tarifas);
}

tarifaCtrl.createTarifa=async(req,res)=>{
    const tarifa= new Tarifa({
        tipo_paquete:req.body.tipo_paquete,
        dimensiones:{
            peso:{
                min:req.body.peso_min,
                max:req.body.peso_max
            },
            volumen:{
                min:req.body.volumen_min,
                max:req.body.volumen_max
            },
            distancia:{
                min:req.body.distancia_min,
                max:req.body.distancia_max
            }
        },
        precio:{
            normal:req.body.precio_normal,
            express:req.body.precio_express
        },
        status:req.body.status
    });
    await tarifa.save();
    res.json({mensaje:"Tarifa Guardada"});
}

tarifaCtrl.editTarifa=async(req,res)=>{
    const {_id}=req.params;
    console.log(req.body);
    const tarifa={};
    
        tarifa.tipo_paquete=req.body.tipo_paquete;
        tarifa.dimensiones={
            peso:{
                min:req.body.peso_min,
                max:req.body.peso_max
            },
            volumen:{
                min:req.body.volumen_min,
                max:req.body.volumen_max
            },
            distancia:{
                min:req.body.distancia_min,
                max:req.body.distancia_max
            }
        };
        tarifa.precio={
            normal:req.body.precio_normal,
            express:req.body.precio_express
        };
        tarifa.status=req.body.status;
    
    await Tarifa.findByIdAndUpdate(_id,{$set:tarifa},{$new:true});
    res.json({mensaje:"Tarifa Actualizada"});
}

tarifaCtrl.deleteTarifa=async(req,res)=>{
    const {_id}=req.params;
    await Tarifa.findByIdAndRemove(_id);
    res.json({mensaje:"Tarifa Eliminada"});
}

tarifaCtrl.cotizar=async(req,res)=>{
    const cotizacion= await Tarifa.findOne({
        "tipo_paquete":req.body.tipo_paquete,
        "dimensiones.peso.min":{$lte:req.body.peso},
        "dimensiones.peso.max":{$gte:req.body.peso},
        "dimensiones.volumen.min":{$lte:req.body.volumen},
        "dimensiones.volumen.max":{$gte:req.body.volumen},
        "dimensiones.distancia.min":{$lte:req.body.distancia},
        "dimensiones.distancia.max":{$gte:req.body.distancia},
        "status":"Activa"
    });
res.json(cotizacion);
}

module.exports=tarifaCtrl;