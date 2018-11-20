const empleadoCtrl={};
const Empleado=require('../models/empleado');
var jwt = require('jsonwebtoken');

empleadoCtrl.getEmpleado=async(req,res)=>{
 const empleado= await Empleado.find(req.params._id);
 res.json(empleado);
}

empleadoCtrl.getEmpleados=async(req,res)=>{
const empleados= await Empleado.find();
res.json(empleados);
}

empleadoCtrl.createEmpleado=async(req,res)=>{
    console.log(req.body);
  
var randoms=0;

for(var i=1;i<=4;i++){
    console.log(i);
    
   randoms=randoms + calcularRandoms();

}    
const contra= req.body.sucursal + (req.body.curp).substring(0,4) + randoms
const empleado= new Empleado({
    
    nombre:req.body.nombre,
    apellido:req.body.apellido,
    email:req.body.email,
    curp:req.body.curp,
    nss:req.body.nss,
    rfc:req.body.rfc,
    salario:req.body.salario,
    fecha_nac:req.body.fecha_nac,
    fecha_contratacion:req.body.fecha_contratacion,
    sucursal:req.body.sucursal,
    puesto:req.body.puesto,
    direccion:{
    calle:req.body.calle,
    num_ext: req.body.num_ext,
    cp:req.body.cp,
    colonia:req.body.colonia,
    },
    telefono:req.body.telefono,
    password: contra,
    status:req.body.status
});
await empleado.save();
res.json({mensaje:'Empleado Guardado'})

function calcularRandoms(){
 return Math.floor(Math.random() * 10);
}
}

empleadoCtrl.editEmpleado=async(req,res)=>{
    const {_id}=req.params;
    await Empleado.findByIdAndUpdate(_id,{$set:req.body},{$new:true});
    res.json({mensaje:"Empleado Actualizado"});
}

empleadoCtrl.deleteEmpleado=async(req,res)=>{
    const {_id}=req.params;
    await Empleado.findByIdAndRemove(_id);
    res.json({mensaje:"Empleado eliminado"});
}

empleadoCtrl.validarEmail= async(req,res)=>{
    const empleado= await Empleado.findOne({email:req.params.email});
    var exists;
    if(empleado!=null || empleado!=undefined){
        exists=1;
    }
    else{
        exists=0;
    }
    res.json(exists);
}

empleadoCtrl.validarCurp= async(req,res)=>{
    const empleado= await Empleado.findOne({curp:req.params.curp});
    var exists;
    if(empleado!=null || empleado!=undefined){
        exists=1;
    }
    else{
        exists=0;
    }
    res.json(exists);
}
empleadoCtrl.validarRfc= async(req,res)=>{
    const empleado= await Empleado.findOne({rfc:req.params.rfc});
    var exists;
    if(empleado!=null || empleado!=undefined){
        exists=1;
    }
    else{
        exists=0;
    }
    res.json(exists);
}
empleadoCtrl.validarNss= async(req,res)=>{
    const empleado= await Empleado.findOne({nss:req.params.nss});
    var exists;
    if(empleado!=null || empleado!=undefined){
        exists=1;
    }
    else{
        exists=0;
    }
    res.json(exists);
}

empleadoCtrl.login=async(req,res)=>{
   const empleado= await Empleado.findOne({email:req.body.email, status:'Activo'});
        if(empleado!=null || empleado!=undefined){

            if(empleado.password===req.body.clave){
               
                var token = jwt.sign({ _id: empleado._id }, 'my_secret_token', {
                    expiresIn: 86400 // expires in 24 hours
                  });
                  
                
                  
                  return res.json({ auth: true, accessToken: token , data: empleado.email, data2:empleado
                    });
            }
            else{
                
                return res.json({ auth: false, accessToken: null, reason: "Invalid Password!" });
            }
        }
        else{
           res.json({mensaje:"Empleado no encontrado"})
        }
  
}

empleadoCtrl.stillLogged=async(req,res)=>{
    res.json("Estoy logueado");
}



module.exports=empleadoCtrl;