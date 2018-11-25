const express=require('express');
const router=express.Router();

const vehiculo=require('../controllers/vehiculo.controller');
const auth=require('../routes/verifyJwtToken');

router.get('/:_id',auth.verifyToken,auth.isGerente,vehiculo.getVehiculo);
router.get('/',auth.verifyToken,auth.isGerente,vehiculo.getVehiculos);
router.get('/matricula/:matricula',auth.verifyToken,auth.isGerente,vehiculo.validarVehiculo);
router.post('/',auth.verifyToken,auth.isGerente,vehiculo.createVehiculo);
router.put('/:_id',auth.verifyToken,auth.isGerente,vehiculo.editVehiculo);
router.delete('/:_id',auth.verifyToken,auth.isGerente,vehiculo.deleteVehiculo);
router.get('/obtener/vehiculos/:sucursal/:vehiculo', auth.verifyToken,auth.isAlmacenista,vehiculo.obtenerVehiculosAlmacen)

module.exports=router;