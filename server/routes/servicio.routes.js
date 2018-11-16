const express=require('express');
const router= express.Router();

const servicio=require('../controllers/servicio.controller');
const auth=require('../routes/verifyJwtToken');

router.get('/:_id',auth.verifyToken,auth.isGerente,servicio.getServicio);
router.get('/',auth.verifyToken,auth.isGerente,servicio.getServicios);
router.post('/',auth.verifyToken,auth.isGerente,servicio.createServicio);
router.put('/:_id',auth.verifyToken,auth.isGerente,servicio.editServicio);
router.delete('/:_id',auth.verifyToken,auth.isGerente,servicio.deleteServicio);
router.get('/cotizacion/servicio/:_id',servicio.getServicio);
router.get('/cotizacion/servicios',servicio.getServicios);
module.exports=router;