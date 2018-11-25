const bitacoraCtrl={};
const Bitacora=require('../models/bitacora');
const Envio=require('../models/envio');
const Empleado=require('../models/empleado');
const Vehiculo=require('../models/vehiculo');

bitacoraCtrl.hacerBitacora=async(req,res)=>{
    let bitacoraBody=req.body;
    const bitacora= new Bitacora();
    bitacora.empleado=bitacoraBody.empleado;
    bitacora.vehiculo=bitacoraBody.vehiculo;
    bitacora.ruta=bitacoraBody.ruta;
    bitacora.fecha=new Date().toLocaleString();
    bitacora.sucursal_origen=bitacoraBody.sucursal_origen;
    bitacora.sucursal_destino=bitacoraBody.sucursal_destino;
    bitacora.status="En ruta foránea";
    const empleado=await Empleado.findById(bitacoraBody.empleado);
    empleado.status="En ruta foránea";

    const vehiculo=await Vehiculo.findById(bitacoraBody.vehiculo);
    vehiculo.status="En ruta foránea";
    

    for(let envio of bitacoraBody.envios){
       
        const envio2= await Envio.findById(envio);
        let salida={fecha:"",sucursal:""};
        salida.fecha=new Date().toLocaleString();
        salida.sucursal=bitacoraBody.sucursal_origen;
        envio2.almacen.salida.push(salida);
        envio2.status="En ruta foránea";
       await envio2.save();  
    }

    bitacora.envios=bitacoraBody.envios;
    await empleado.save();
    await vehiculo.save();
    await bitacora.save();
    res.json("Bitacora de viaje elaborada!");
}

bitacoraCtrl.obtenerBitacoras=async(req,res)=>{
    const bitacoras=await Bitacora.find({sucursal_destino:req.params.sucursal,status:"Creada"}).populate('empleado','nombre apellido').populate('vehiculo','matricula marca modelo').populate('ruta','descripcion');
    if(bitacoras.length){
        res.json(bitacoras);
    }
    else{
        res.json(null);
    }
}

bitacoraCtrl.editBitacoras=async(req,res)=>{
    const bitacora=await Bitacora.findById(req.params._id);
    bitacora.status="Finalizada";
    bitacora.fecha_termino=new Date().toLocaleString();
    const empleado=await Empleado.findById(bitacora.empleado);
    empleado.status="Activo";
    const vehiculo=await Vehiculo.findById(bitacora.vehiculo);
    vehiculo.status="Activo"
    vehiculo.sucursal=req.params.sucursal;

    await vehiculo.save();
    await empleado.save();
    await bitacora.save();
    res.json("Valores actualizados");
}

module.exports=bitacoraCtrl;