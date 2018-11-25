const express=require('express');
const router=express.Router();

const auth=require('../routes/verifyJwtToken');
const cargacamion=require('../controllers/cargacamion.controller');

router.post('/',auth.verifyToken,auth.isAlmacenista,cargacamion.hacerCargaCamion);
router.get('/:empleado',auth.verifyToken,auth.isConductorLocal,cargacamion.obtenerCargaCamion);
router.get('/sucursal/:sucursal',auth.verifyToken,auth.isAlmacenista,cargacamion.obtenerCargasCamion);
router.post('/actualizar/:_id',auth.verifyToken,auth.isAlmacenista,cargacamion.editCargaCamion);

module.exports=router;