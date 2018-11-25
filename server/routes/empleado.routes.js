const express=require('express');
const router=express.Router();

const empleado=require('../controllers/empleado.controller');
const auth=require('../routes/verifyJwtToken');

router.get('/:_id',auth.verifyToken,auth.isGerente,empleado.getEmpleado);
router.get('/',auth.verifyToken,auth.isGerente,empleado.getEmpleados);
router.get('/email/:email',empleado.validarEmail);
router.get('/curp/:curp',empleado.validarCurp);
router.get('/rfc/:rfc',empleado.validarRfc);
router.get('/nss/:nss',empleado.validarNss);
router.post('/',auth.verifyToken,auth.isGerente,empleado.createEmpleado);
router.post('/login/',empleado.login);
router.put('/:_id',auth.verifyToken,auth.isGerente,empleado.editEmpleado);
router.delete('/:_id',auth.verifyToken,auth.isGerente,empleado.deleteEmpleado);
router.get('/conductores/locales/:sucursal',auth.verifyToken,auth.verifyToken, empleado.obtenerConductores);
router.get('/conductores/foraneos/:sucursal',auth.verifyToken,auth.verifyToken, empleado.obtenerConductoresForaneos);



module.exports=router;