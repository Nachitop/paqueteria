const express= require('express');
const app = express();
const cors=require('cors');


const {mongoose}=require('./database');
//settings

app.set('port', process.env.PORT || 3000);
//middlewares
app.use(express.json());
app.use(cors({origin:'http://localhost:4200'}));

//routes
app.use('/api/sucursal',require('./routes/sucursal.routes'));
app.use('/api/empleado',require('./routes/empleado.routes'));
app.use('/api/tarifa',require('./routes/tarifa.routes'));
app.use('/api/vehiculo',require('./routes/vehiculo.routes'));
app.use('/api/servicio',require('./routes/servicio.routes'));
app.use('/api/horarios',require('./routes/horarios.routes'));

// startin' server
app.listen(app.get('port'), ()=>{
    console.log("server on port" , app.get('port'))
});