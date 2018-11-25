const express=require('express');
const router=express.Router();

const auth=require('../routes/verifyJwtToken');
const reportes=require('../controllers/reportes.controller');


router.get('/reporte1/:sucursal/:desde/:hasta',auth.verifyToken,auth.isGerente,reportes.reporte1);
router.get('/reporte2/:sucursal/:desde/:hasta',auth.verifyToken,auth.isGerente,reportes.reporte2);
router.get('/reporte3/:sucursal/:desde/:hasta',auth.verifyToken,auth.isGerente,reportes.reporte3);

module.exports=router;