const express= require('express');
const router=express.Router();

const sucursal=require('../controllers/sucursal.controller');
const auth= require('../routes/verifyJwtToken');

router.get('/:_id',sucursal.getSucursal);
router.get('/',sucursal.getSucursales);
router.get('/sucursal/:clave',sucursal.validarSucursal);
router.get('/obtener/sucursal/:clave',sucursal.getSucursalByClave);
router.post('/',auth.verifyToken,auth.isGerente,sucursal.createSucursal);
router.put('/:_id',auth.verifyToken,auth.isGerente,sucursal.editSucursal);
router.delete('/:_id',auth.verifyToken,auth.isGerente,sucursal.deleteSucursal);
module.exports=router;