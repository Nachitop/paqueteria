const mongoose=require('mongoose');
const {Schema}=mongoose;

const EnvioSchema= new Schema({
    no_guia:{type:String},
    id_recoleccion:{type:String},
    informacion_envio:{

        paquetes: {
            cantidad:{type:Number},
            dimensiones:[{
                peso:{type:Number},
                largo:{type:Number},
                alto:{type:Number},
                ancho:{type:Number},
                
            }],
            valor_seguro:{type:Number}
         },

        sobres:{
            cantidad:   {type:Number}
        },
        tipo_envio:{type:String,required:true},
        metodo_pago:{type:String,required:true}
     
    },
    direccion:[{
        nombre:{type:String,required:true},
        apellido:{type:String},
        email:{type:String},
        telefono:{type:String,required:true},
        calle:{type:String,required:true},
        numE:{type:String,required:true},
        edificio:{type:String},
        numI:{type:String},
        referencias_cercanas:{type:String},
        cp:{type:String,required:true},
        colonia:{type:String,required:true}
    }],
    servicios:[{type:Schema.Types.ObjectId,ref:'Servicio'}],
    tarifa:[{type:Schema.Types.ObjectId,ref:'Tarifa'}],
    costo:{
        subtotal:{type:Number,required:true},
        iva:{type:Number,required:true},
        total:{type:Number,required:true},
    },
    comentarios:[{
        fecha:{type:String},
        lugar:{type:String},
        comentario:{type:String},
    
    }],
    fecha_recoleccion_programada:{type:String},
    horario_recoleccion:{type:String},
    //fecha_documentacion:{type:String,required:true},
    empleado:{type:String},
    sucursal:{type:String},
    clave:{type:String},
    status:{type:String,required:true},
    entrega:{},
    recoleccion:{},
    fecha:{type:String},
    almacen: {
        entrada:
        [{
            fecha:{type:String},
            sucursal:{type:String}
                }        ],
        salida:[{
            fecha:{type:String},
            sucursal:{type:String}
        }]
    },
});

module.exports=mongoose.model('Envio',EnvioSchema);