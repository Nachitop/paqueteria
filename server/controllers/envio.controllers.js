const envioCtrl={};
const Envio=require('../models/envio');
const Empleado=require('../models/empleado');
const Sucursal=require('../models/sucursal');
const Horario=require('../models/horarios');

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
    envio.fecha=new Date().toLocaleString();
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

envioCtrl.obtenerGuiaCompletaById=async(req, res)=>{
    const envio = await Envio.findById(req.params._id).populate('servicios').populate('tarifa');
   console.log(envio);
    if(envio){
    res.json(envio);
    }else{
        res.json(null);
    }
}

envioCtrl.entradaAlmacen=async(req,res)=>{
    
 let envios=req.body;
 
for(let element of envios){
    const envio=await Envio.findById(element._id);
  
    
    let coment={
        fecha:"",
        lugar:"",
        comentario:"",
    }
    coment.fecha=new Date().toLocaleString();
    const sucursal= await Sucursal.findOne({clave:req.params.clave});
    coment.lugar=sucursal.nombre;
   
    if(envio.status==="En ruta local para entrega"){
        coment.comentario="No pudo ser entregado"
    }
    else{
        if(envio.status==="Documentada" || envio.status==="Recolectado" || envio.status==="No recolectado" || envio.status==="No recolectada"){
            coment.comentario="En sucursal";
        }
        else{
            if(envio.status==="En ruta foránea"){
                coment.comentario="En sucursal destino, pendiente de entrega";
            }
        }
    }
    let entrada={fecha:"",sucursal:""};
    entrada.fecha=new Date().toLocaleString();
    entrada.sucursal=req.params.clave;
    envio.sucursal=req.params.clave;
    envio.comentarios.push(coment);
    envio.almacen.entrada.push(entrada)
    envio.status="En Almacén";
   await envio.save()
};



res.json("Envíos agregados al almacén con exito");
}

envioCtrl.entregaEnvio=async(req,res)=>{
    
    const envio= await Envio.findById(req.params._id);
    console.log(envio.sucursal);
    console.log(req.params.clave)
    if(envio.sucursal===req.params.clave && envio.status==="En Almacén"){
        let comentario=req.body;
        let comentario2={};
        console.log(comentario)
        comentario2.fecha=comentario.fecha;
        comentario2.lugar=comentario.lugar;
        comentario2.comentario=comentario.comentario
        envio.status="Entregado"
        envio.comentarios.push(comentario2);
        let salida={fecha:"",sucursal:""};
        salida.fecha=new Date().toLocaleString();
        salida.sucursal=envio.sucursal;
        envio.almacen.salida.push(salida);
        
        envio.save();
        res.json({mensaje:"Envío entregado con exito!"});
    }
    else{
        res.json({error:"Error del servidor o el envío no se encuentra disponible para la entrega"});
    }
    
    
    }

envioCtrl.ObtenerEnviosPorRecolectar=async(req,res)=>{
    let sucursal=req.params.clave;
    const horario2= await Horario.findById(req.params.horario);

    let horario=horario2.desde+="-"+horario2.hasta;
    console.log(sucursal);
    console.log(horario);
    let fecha=new Date().toLocaleDateString().replace("-","/").replace("-","/");
    var array_fecha=fecha.split("/");
    fecha=array_fecha[2]+"/"+array_fecha[1]+"/"+array_fecha[0];

    const envios=await Envio.find({fecha_recoleccion_programada:fecha,horario_recoleccion:horario,status:"Documentada",sucursal:sucursal});
    if(envios.length){
        res.json(envios)
    }
    else{
        res.json(null);
    }
}

envioCtrl.entregaADomicilio=async(req,res)=>{
    console.log(req.body)
    const envio=await Envio.findById(req.body._id);
    let comentario={
        fecha:"",
        lugar:"",
        comentario:""

    }
    let mensaje;
    comentario.fecha=req.body.fecha;
    comentario.lugar="Domicilio del cliente";
    if(req.body.entregado==true){
      
        envio.status="Entregado"
       

       
        
        comentario.comentario="Entregado en domicilio del cliente"
        mensaje="Envio entregado con exito!";
        
       
    }else{
        envio.status="No entregado";
        comentario.comentario="No se pudo entregar";
        mensaje="Envio no entregado!";
    }
    if(req.body.comentario!=""){
        comentario.comentario=comentario.comentario+", "+req.body.comentario
        }
        envio.comentarios.push(comentario);
        let entrega={empleado:"",recibe:"",fecha:""};
        entrega.empleado=req.body.empleado;
        entrega.recibe=req.body.recibe;
        entrega.fecha=fecha=new Date().toLocaleString();
        envio.entrega=entrega
        
        await envio.save();
        res.json(mensaje);
}

envioCtrl.recoleccionADomicilio=async(req,res)=>{

    const envio=await Envio.findById(req.body._id);
    let comentario={
        fecha:"",
        lugar:"",
        comentario:""

    }
    let mensaje;
    comentario.fecha=req.body.fecha;
    comentario.lugar="Domicilio del cliente";
    if(req.body.recolectado==true){
      
        envio.status="Recolectado"
       

       
        
        comentario.comentario="Recolectado en domicilio del cliente"
        mensaje="Envio recolectado con exito!";
        
       
    }else{
        envio.status="No recolectado";
        comentario.comentario="No se pudo recolectar";
        mensaje="Envio no recolectado!";
    }
    if(req.body.comentario!=""){
        comentario.comentario=comentario.comentario+", "+req.body.comentario
        }
        envio.comentarios.push(comentario);
        let recoleccion={empleado:"",atiende:"",fecha:""};
        recoleccion.empleado=req.body.empleado;
        recoleccion.atiende=req.body.atiende;
        recoleccion.fecha=fecha=new Date().toLocaleString();
        envio.recoleccion=recoleccion;
        
        await envio.save();
        res.json(mensaje);
}
module.exports=envioCtrl;