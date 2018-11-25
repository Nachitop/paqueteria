const cargaCtrl={};
const CargaCamion=require('../models/cargacamion');
const Envio=require('../models/envio');
const Vehiculo=require('../models/vehiculo');
const Empleado=require('../models/empleado');
const Ruta=require('../models/rutas');

cargaCtrl.hacerCargaCamion=async(req,res)=>{
    let carga=req.body;
    const cargacamion=new CargaCamion();
    cargacamion.empleado=carga.empleado;
    cargacamion.ruta=carga.ruta;
    cargacamion.vehiculo=carga.vehiculo;
    cargacamion.fecha=carga.fecha;
    cargacamion.sucursal=carga.sucursal;
    cargacamion.status=carga.status;

    const empleado= await Empleado.findById(carga.empleado);
    empleado.status="En ruta local"
    const vehiculo=await Vehiculo.findById(carga.vehiculo);
    vehiculo.status="En ruta local";

    const ruta= await Ruta.findById(carga.ruta);
    let rut;
    rut=ruta.descripcion;
    

    for(let element of carga.envios) {
        if(element){
        cargacamion.envios.push(element);
        let coment={
            fecha:"",
            lugar:"",
            comentario:"",
        }

        coment.fecha=carga.fecha;
        coment.lugar=rut;
        coment.comentario="En ruta local para entrega";
        const envio= await Envio.findById(element);
        envio.status="En proceso de entrega";
        envio.comentarios.push(coment);
        let salida={fecha:"",sucursal:""};
        salida.fecha=new Date().toLocaleString();
        salida.sucursal=carga.sucursal;
        envio.almacen.salida.push(salida);
        await envio.save();
    }

    };

    await cargacamion.save();
    await empleado.save()
    await vehiculo.save();
    
   res.json("Carga de camión guardada!")
    
}


cargaCtrl.obtenerCargaCamion=async(req,res)=>{
    let empleado2=req.params.empleado;
    console.log(empleado2);
    const cargacamion=await CargaCamion.findOne({empleado:empleado2, status:"Creada"});
    console.log(cargacamion);
    if(cargacamion){
        res.json(cargacamion);
    }
    else{
        res.json(null);
    }
}

cargaCtrl.obtenerCargasCamion=async(req,res)=>{
    const cargascamion=await CargaCamion.find({sucursal:req.params.sucursal,status:"Creada"}).populate('empleado','nombre apellido').populate('vehiculo','matricula marca modelo').populate('ruta','descripcion');
    if(cargascamion.length){
        res.json(cargascamion);
    }else{
        res.json(null);
    }
}

cargaCtrl.editCargaCamion=async(req,res)=>{
    const cargacamion=await CargaCamion.findById(req.params._id);
    cargacamion.status="Finalizada";
    cargacamion.fecha_termino=new Date().toLocaleString();
    const empleado=await Empleado.findById(cargacamion.empleado);
    empleado.status="Activo";
    const vehiculo=await Vehiculo.findById(cargacamion.vehiculo);
    vehiculo.status="Activo"
    
    await vehiculo.save();
    await empleado.save();
    await cargacamion.save();

    res.json("Valores actualizados");
}

module.exports=cargaCtrl;