const cargaRecoleccionCtrl={};
const CargaRecoleccion=require('../models/cargarecoleccion');
const Envio=require('../models/envio');
const Vehiculo=require('../models/vehiculo');
const Empleado=require('../models/empleado');
const Ruta=require('../models/rutas');

cargaRecoleccionCtrl.hacerCargaRecoleccion=async(req,res)=>{
    let carga=req.body;
    const cargarecoleccion=new CargaRecoleccion();
    cargarecoleccion.empleado=carga.empleado;
    cargarecoleccion.ruta=carga.ruta;
    cargarecoleccion.vehiculo=carga.vehiculo;
    cargarecoleccion.fecha=carga.fecha;
    cargarecoleccion.sucursal=carga.sucursal;
    cargarecoleccion.horario=carga.horario;
    cargarecoleccion.status=carga.status;

    const empleado= await Empleado.findById(carga.empleado);
    empleado.status="En ruta local para recolección"
    const vehiculo=await Vehiculo.findById(carga.vehiculo);
    vehiculo.status="En ruta local para recolección";

    const ruta= await Ruta.findById(carga.ruta);
    let rut;
    rut=ruta.descripcion;
    

    for(let element of carga.envios) {
        if(element){
        cargarecoleccion.envios.push(element);
        let coment={
            fecha:"",
            lugar:"",
            comentario:"",
        }

        coment.fecha=carga.fecha;
        coment.lugar=rut;
        coment.comentario="En ruta local para recolección";
        const envio= await Envio.findById(element);
        envio.status="En proceso de recolección";
        envio.comentarios.push(coment);
        let salida={fecha:"",sucursal:""};
        salida.fecha=new Date().toLocaleString();
        salida.sucursal=carga.sucursal;
        envio.almacen.salida.push(salida);
        await envio.save();
    }

    };

    await cargarecoleccion.save();
    await empleado.save()
    await vehiculo.save();
    
   res.json("Carga de recolección guardada!")
    
}

cargaRecoleccionCtrl.obtenerCargaRecoleccion=async(req,res)=>{
    let empleado2=req.params.empleado;
    console.log(empleado2);
    const cargarecoleccion=await CargaRecoleccion.findOne({empleado:empleado2, status:"Creada"});
    console.log(cargarecoleccion);
    if(cargarecoleccion){
        res.json(cargarecoleccion);
    }
    else{
        res.json(null);
    }


}

cargaRecoleccionCtrl.obtenerCargasRecoleccion=async(req,res)=>{
    const cargasrecoleccion=await CargaRecoleccion.find({sucursal:req.params.sucursal,status:"Creada"}).populate('empleado','nombre apellido').populate('vehiculo','matricula marca modelo').populate('ruta','descripcion');
    if(cargasrecoleccion.length){
        res.json(cargasrecoleccion);
    }
    else{
        res.json(null);
    }
}

cargaRecoleccionCtrl.editCargaRecoleccion=async(req,res)=>{
    const cargarecoleccion=await CargaRecoleccion.findById(req.params._id);
    cargarecoleccion.status="Finalizada";
    cargarecoleccion.fecha_termino=new Date().toLocaleString();
    const empleado=await Empleado.findById(cargarecoleccion.empleado);
    empleado.status="Activo";
    const vehiculo=await Vehiculo.findById(cargarecoleccion.vehiculo);
    vehiculo.status="Activo"
    
    await vehiculo.save();
    await empleado.save();
    await cargarecoleccion.save();
    res.json("Valores actualizados");
}

module.exports=cargaRecoleccionCtrl;