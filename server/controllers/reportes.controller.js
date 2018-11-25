reportesCtrl={};
const Envio=require('../models/envio');

reportesCtrl.reporte1=async(req,res)=>{
    let sucursal=req.params.sucursal;
    let desde=req.params.desde;
    let hasta=req.params.hasta;
    let desde2=desde.split("-");
    let hasta2=hasta.split("-");
    console.log(desde2);
    console.log(hasta2);
    desde=desde2[2]+"/"+desde2[1]+"/"+desde2[0];
    hasta=hasta2[2]+"/"+hasta2[1]+"/"+hasta2[0];
    console.log(desde);
    console.log(hasta);

    const result= await Envio.aggregate([
       {$match:{status:{$ne:"Cancelada"},sucursal:sucursal,fecha:{$gte:desde},fecha:{$lte:hasta}}},
        //{$unwind:"$informacion_envio"},
        {$group:{_id:null,
            normal_dinero:{
                $sum:{
                    $cond:[
                        { $eq: ["Normal","$informacion_envio.tipo_envio"] },
                        "$costo.total",
                        0
                    ]
                }
            },
            express_dinero:{
                $sum:{
                    $cond:[
                        { $eq: ["Express","$informacion_envio.tipo_envio"] },
                        "$costo.total",
                        0
                    ]
                }
            },
            normal_cantidad:{
                $sum:{
                    $cond:[
                        { $eq: ["Normal","$informacion_envio.tipo_envio"] },
                        1,
                        0
                    ]
                }
            },
            express_cantidad:{
                $sum:{
                    $cond:[
                        { $eq: ["Express","$informacion_envio.tipo_envio"] },
                        1,
                        0
                    ]
                }
            },
            total:{$sum:"$costo.total"}}}
    ]);
    console.log(result);
    res.json(result);
}

reportesCtrl.reporte2=async(req,res)=>{
    let sucursal=req.params.sucursal;
    let desde=req.params.desde;
    let hasta=req.params.hasta;
    let desde2=desde.split("-");
    let hasta2=hasta.split("-");
    
    desde=desde2[2]+"/"+desde2[1]+"/"+desde2[0];
    hasta=hasta2[2]+"/"+hasta2[1]+"/"+hasta2[0];

    const result= await Envio.aggregate([
       {$match:{sucursal:sucursal,fecha:{$gte:desde},fecha:{$lte:hasta}}},
        
        {$group:{_id:null,
            cancelada_dinero:{
                $sum:{
                    $cond:[
                        { $eq: ["Cancelada","$status"] },
                        "$costo.total",
                        0
                    ]
                }
            },
            otras_dinero:{
                $sum:{
                    $cond:[
                        { $ne: ["Cancelada","$status"] },
                        "$costo.total",
                        0
                    ]
                }
            },
            cancelada_cantidad:{
                $sum:{
                    $cond:[
                        { $eq: ["Cancelada","$status"] },
                        1,
                        0
                    ]
                }
            },
            otras_cantidad:{
                $sum:{
                    $cond:[
                        { $ne: ["Cancelada","$status"] },
                        1,
                        0
                    ]
                }
            },
            }}
    ]);
    console.log(result);
    res.json(result);
}


reportesCtrl.reporte3=async(req,res)=>{
    let sucursal2=req.params.sucursal;
    let desde=req.params.desde;
    let hasta=req.params.hasta;
    let desde2=desde.split("-");
    let hasta2=hasta.split("-");
    
    desde=desde2[2]+"/"+desde2[1]+"/"+desde2[0];
    hasta=hasta2[2]+"/"+hasta2[1]+"/"+hasta2[0];

    let countEntregadosADom;
    let acumEntregasADom;
    let countEntregadosOcurre;
    let acumEntregasOcurre;
    let countRecolectados;
    let acumRecolectados;
    const envios=await Envio.find({status:{$ne:"Cancelada"},sucursal:sucursal2,
    fecha:{
        $gte:desde,$lte:hasta
    }
    }
        );
    console.log(envios);
    console.log(envios.length);
    if(envios.length){
        envios.forEach(envio=>{
            if(envio.entrega=="" && envio.status==="Entregado"){
                countEntregadosOcurre=countEntregadosOcurre+1;
                acumEntregasOcurre=acumEntregasOcurre+envio.costo.total;
          
        }
        else{
            if(envio.entrega.recibe!=""){
                countEntregadosADom=countEntregadosADom+1;
                acumEntregasADom=acumEntregasADom+envio.costo.total;
            }
        }


        if(envio.recoleccion!=""){
            countRecolectados=countRecolectados+1;
            acumRecolectados=acumRecolectados+envio.costo.total;
        }

        });

        res.json({cantidad_recolectados:countRecolectados, dinero_recolectados:acumRecolectados,cantidad_entregadosO:countEntregadosOcurre,dinero_entregados:acumEntregasOcurre,
            cantidad_entregadosD:countEntregadosADom,dinero_entregados:acumEntregasADom})
    }else{
        res.json(null);
    }
}


module.exports=reportesCtrl;