const express=require('express');
const router=express.Router();

const envio=require('../controllers/envio.controllers');
const auth=require('../routes/verifyJwtToken');

router.post('/',envio.createEnvio);
router.get('/cancelar/guia/:guia/:clave',envio.CancelarGuia);
router.get('/obtener/guia/:guia', envio.obtenerGuia);
router.get('/obtener/guia/completa/:guia', envio.obtenerGuiaCompleta);
router.post('/entrada/almacen/:_id/:clave',auth.verifyToken,auth.isAlmacenista, envio.entradaAlmacen)

module.exports=router;