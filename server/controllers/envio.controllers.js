const envioCtrl={};
const Envio=require('../models/envio');
const Empleado=require('../models/empleado');

envioCtrl.createEnvio=async(req,res)=>{
    console.log(req.body);
    var date=new Date().toLocaleString().replace("-","").replace("-","").replace("/","").replace("/","").replace(" ","").replace(":","").replace(":","");
    var id_recoleccion="";
    var guia="";
    var serv=[];
    var direcciones=[];
    var direccion={};
    var direccion2={};
  //  if(empleado_email!=undefined || empleado_email!=null || empleado_email!=''){
   //    empleado2 = await Empleado.findOne({
   //         email:empleado_email
    //    });
        guia=generarGuia(req.body.sucursal,date);
    //}
   // if(req.body) {
      //  id_recoleccion=generarRecoleccion(date);
    //}
    const envio= new Envio({
        no_guia: guia,
        id_recoleccion: id_recoleccion,
        informacion_envio:{
            paquetes:{
                cantidad: req.body.paquetes,
               // dimensiones:req.body.dimensiones,
                valor_seguro: req.body.valor_seguro,
            },
            sobres:{
                cantidad: req.body.sobres
            },
            tipo_envio:req.body.tipo_envio,
            metodo_pago:req.body.metodo_pago
        },
    

     // direccion:req.body.informacionEnvio,
            
        
       // servicios:req.body.servicios._id,
      //  tarifa:req.body.tarifa._id,
        costo:{
            subtotal:req.body.resumencotizacion.subtotal,
            iva:req.body.resumencotizacion.iva,
            total:req.body.resumencotizacion.total,
        },
        
        fecha_recoleccion_programada:req.body.fecha_recoleccion_programada,
        horario_recoleccion:req.body.horario_recoleccion,
       
        status: req.body.status
    }) ;

    req.body.dimensiones.forEach(element=>{
        envio.informacion_envio.paquetes.dimensiones.push(element);
    });
    //if(empleado2!=null || empleado2!=""|| empleado2!=undefined || empleado2!={}){
        envio.empleado=req.body.empleado
        //envio.sucursal=empleado2.sucursal
        //}
    envio.sucursal=req.body.sucursal;    
    direcciones=req.body.informacionEnvio;
    direccion=direcciones[0];
    direccion.cp=req.body.cp_origen;
    direccion.colonia=req.body.colonia_origen

    direccion2=direcciones[1];
    direccion2.cp=req.body.cp_destino;
    direccion2.colonia=req.body.colonia_destino

    //envio.direccion.push(req.body.informacionEnvio);
    envio.direccion.push(direccion);
    envio.direccion.push(direccion2);
    serv=req.body.servicios;
  
    serv.forEach(element => {
        envio.servicios.push(element._id);
        if(element.nombre==="Recolección a domicilio"){
            envio.id_recoleccion=generarRecoleccion(date);
        }
    });
   
    envio.comentarios.push(req.body.comentario);
    req.body.tarifa.forEach(element=>{
        envio.tarifa.push(element._id)
    });

    let password="";
    for(let i=1;i<=4;i++){
        password=password+ calcularRandoms();
        password=password.toString();
    }
    envio.clave=password;
   await  envio.save();
    res.json(envio);
    console.log(req.params.comentario);
}

function generarGuia(sucursal,date){
    return sucursal + date
}
function generarRecoleccion(date){
    return "R" + date
}

function calcularRandoms(){
    return Math.floor(Math.random() * 10);
   }

envioCtrl.CancelarGuia=async(req,res)=>{
   
    const envio=await  Envio.findOne({no_guia:req.params.guia, clave:req.params.clave ,$or: [{status:"Documentada"},{status:"En Almacén"}]});
    console.log(envio);
    if((envio!=null && envio!=undefined && envio!="") ){
        if(envio.comentarios.length<3){
        await Envio.findByIdAndUpdate(envio._id,{$set:{status:"Cancelada"}});
         res.json({mensaje:"Guia Cancelada", envio:envio.costo.total});
        }else{
            res.json({mensaje:"Esta guia ya no se puede cancelar debido a que ya no está en la sucursal origen"});
        }
    }
    else{
        res.json({mensaje:"Error al cancelar la guía, clave incorrecta o guia inexistente"});
    }
}


envioCtrl.obtenerGuia=async(req,res)=>{
    await Envio.findOne({no_guia:req.params.guia}).exec((error,envio)=>{
        if(!error){
            if(envio){
                res.json({paquetes: envio.informacion_envio.paquetes.cantidad, sobres:envio.informacion_envio.sobres.cantidad});
            }
            else{
                res.json({mensaje:"No se encontró el número de guia"})
            }
        }else{
            res.json({mensaje:"Erorr del servidor al recuperar Guia"});
        }
    });
};

envioCtrl.obtenerGuiaCompleta=async(req, res)=>{
    const envio = await Envio.find({no_guia:req.params.guia}).populate('servicios').populate('tarifa');
   
    if(envio.length){
    res.json(envio);
    }else{
        res.json(null);
    }
}

envioCtrl.entradaAlmacen=async(req,res)=>{
    
const envio= await Envio.findById(req.params._id)//Envio.findByIdAndUpdate(req.params._id,{$set:{sucursal:req.params.clave, status:"En almacén"}}, {$push:{comentarios:req.body.comentario}} );

let comentario=req.body;
let comentario2={};
comentario2.fecha=comentario.fecha;
comentario2.lugar=comentario.lugar;
comentario2.comentario=comentario.comentario

envio.sucursal=req.params.clave
envio.status="En Almacén"
envio.comentarios.push(comentario2);
envio.save();
res.json({mensaje:"Envíos agregados al almacén con exito"});
}

envioCtrl.entregaEnvio=async(req,res)=>{
    
    const envio= await Envio.findById(req.params._id);
    if(envio.sucursal===req.params.clave && envio.status==="En Almacén"){
        let comentario=req.body;
        let comentario2={};
        console.log(comentario)
        comentario2.fecha=comentario.fecha;
        comentario2.lugar=comentario.lugar;
        comentario2.comentario=comentario.comentario
        envio.status="Entregado"
        envio.comentarios.push(comentario2);
        envio.save();
        res.json({mensaje:"Envío entregado con exito!"});
    }
    else{
        res.json({error:"Error del servidor o el envío no se encuentra disponible para la entrega"});
    }
    
   
    
    //envio.sucursal=req.params.clave
    
    
    }

module.exports=envioCtrl;