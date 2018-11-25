const express= require('express');
const app = express();
const cors=require('cors');
const bodyParser = require('body-parser');

const {mongoose}=require('./database');
//settings

app.set('port', process.env.PORT || 3000);
//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//app.use(express.json());
app.use(cors({origin:'http://localhost:4200'}));

//routes
app.use('/api/sucursal',require('./routes/sucursal.routes'));
app.use('/api/empleado',require('./routes/empleado.routes'));
app.use('/api/tarifa',require('./routes/tarifa.routes'));
app.use('/api/vehiculo',require('./routes/vehiculo.routes'));
app.use('/api/servicio',require('./routes/servicio.routes'));
app.use('/api/horarios',require('./routes/horarios.routes'));
app.use('/api/envio',require('./routes/envio.routes'));
app.use('/api/ruta',require('./routes/rutas.routes'));
app.use('/api/carga',require('./routes/cargacamion.routes'));
app.use('/api/cargarecoleccion',require('./routes/cargarecoleccion.routes'));
app.use('/api/bitacora',require('./routes/bitacora.routes'));
app.use('/api/reportes',require('./routes/reportes.routes'));

// startin' server
app.listen(app.get('port'), ()=>{
    console.log("server on port" , app.get('port'))
});