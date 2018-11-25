const express=require('express');
const router=express.Router();

const auth=require('../routes/verifyJwtToken');
const bitacora=require('../controllers/bitacora.controller');

router.post('/',auth.verifyToken,auth.isAlmacenista,bitacora.hacerBitacora);
router.get('/sucursal/:sucursal',auth.verifyToken,auth.isAlmacenista,bitacora.obtenerBitacoras);
router.post('/actualizar/:_id/:sucursal',auth.verifyToken,auth.isAlmacenista,bitacora.editBitacoras);

module.exports=router;