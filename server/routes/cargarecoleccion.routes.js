const express=require('express');
const router=express.Router();

const auth=require('../routes/verifyJwtToken');
const cargarecoleccion=require('../controllers/cargarecoleccion.controller');

router.post('/',auth.verifyToken,auth.isAlmacenista,cargarecoleccion.hacerCargaRecoleccion);
router.get('/:empleado',auth.verifyToken,auth.isConductorLocal,cargarecoleccion.obtenerCargaRecoleccion);
router.get('/sucursal/:sucursal',auth.verifyToken,auth.isAlmacenista,cargarecoleccion.obtenerCargasRecoleccion);
router.post('/actualizar/:_id',auth.verifyToken,auth.isAlmacenista,cargarecoleccion.editCargaRecoleccion);

module.exports=router;