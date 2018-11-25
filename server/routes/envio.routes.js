const express=require('express');
const router=express.Router();

const envio=require('../controllers/envio.controllers');
const auth=require('../routes/verifyJwtToken');

router.post('/',envio.createEnvio);
router.get('/cancelar/guia/:guia/:clave',envio.CancelarGuia);
router.get('/obtener/guia/:guia', envio.obtenerGuia);
router.get('/obtener/guia/completa/:guia', envio.obtenerGuiaCompleta);
router.get('/obtener/guia/completa/byid/:_id', envio.obtenerGuiaCompletaById);
router.post('/entrada/almacen/:clave',auth.verifyToken,auth.isAlmacenista, envio.entradaAlmacen);
router.post('/entrega/envio/:_id/:clave',auth.verifyToken,auth.isCajero, envio.entregaEnvio);
router.post('/entrega/envio/domicilio',auth.verifyToken,auth.isConductorLocal, envio.entregaADomicilio);
router.post('/recoleccion/envio/domicilio',auth.verifyToken,auth.isConductorLocal, envio.recoleccionADomicilio);
router.get('/obtener/envios/recolectar/:clave/:horario',auth.verifyToken,auth.isAlmacenista,envio.ObtenerEnviosPorRecolectar);


module.exports=router;