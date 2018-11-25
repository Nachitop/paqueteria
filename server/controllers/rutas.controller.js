const rutaCtrl={};
const Ruta=require('../models/rutas');

rutaCtrl.obtenerRutas=async(req,res)=>{
    const rutas= await Ruta.find({tipo_ruta:req.params.tipoRuta,status:"Activa"});
    if(rutas.length){
        res.json(rutas);
    }
    else
    {
        res.json(null);
    }

}

module.exports=rutaCtrl;