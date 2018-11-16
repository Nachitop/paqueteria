const express=require('express');
const router=express.Router();

const horarios=require('../controllers/horarios.controllers');

router.get('/',horarios.getHorarios);
router.post('/',horarios.createHorario);

module.exports=router;