const express=require('express');
const router=express.Router();

const tarifa=require('..//controllers/tarifa.controller');
const auth= require('../routes/verifyJwtToken');

router.get('/:_id',auth.verifyToken,auth.isGerente,tarifa.getTarifa);
router.get('/',auth.verifyToken,auth.isGerente,tarifa.getTarifas);
router.post('/',auth.verifyToken,auth.isGerente,tarifa.createTarifa);
router.put('/:_id',auth.verifyToken,auth.isGerente,tarifa.editTarifa);
router.delete('/:_id',auth.verifyToken,auth.isGerente,tarifa.deleteTarifa);
router.post('/cotizar',tarifa.cotizar);
module.exports=router;