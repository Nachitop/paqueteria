const express=require('express');
const router=express.Router();

const rutas=require('../controllers/rutas.controller');
const auth=require('../routes/verifyJwtToken');

router.get('/:tipoRuta', auth.verifyToken, auth.isAlmacenista,rutas.obtenerRutas);

module.exports=router;