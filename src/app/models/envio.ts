export interface Envio {
    informacion_envio:            InformacionEnvio;
    costo:                        Costo;
    servicios:                    Servicio[];
    tarifa:                       Tarifa[];
    _id:                          string;
    no_guia:                      string;
    id_recoleccion:               string;
    fecha_recoleccion_programada: string;
    horario_recoleccion:          string;
    status:                       string;
    direccion:                    Direccion[];
    comentarios:                  Comentario[];
    empleado:                     string;
    sucursal:                     string;
    clave:                        string;
    __v:                          number;
}

export interface Comentario {
    _id:        string;
    fecha:      string;
    comentario: string;
    lugar:      string;
}

export interface Costo {
    subtotal: number;
    iva:      number;
    total:    number;
}

export interface Direccion {
    _id:      string;
    nombre:   string;
    apellido: string;
    email:    string;
    telefono: string;
    calle:    string;
    numE:     string;
    edificio: string;
    numI:     string;
    cp:       string;
    colonia:  string;
}

export interface InformacionEnvio {
    paquetes:    Paquetes;
    sobres:      Sobres;
    tipo_envio:  string;
    metodo_pago: string;
}

export interface Paquetes {
    cantidad:     number;
    valor_seguro: number;
    dimensiones:  Dimensione[];
}

export interface Dimensione {
    _id:   string;
    peso:  number;
    largo: number;
    ancho: number;
    alto:  number;
}

export interface Sobres {
    cantidad: number;
}

export interface Servicio {
    _id:        string;
    nombre:     string;
    porcentaje: number;
    status:     string;
    __v:        number;
}

export interface Tarifa {
    dimensiones:  Dimensiones;
    precio:       Precio;
    _id:          string;
    tipo_paquete: string;
    status:       string;
    __v:          number;
}

export interface Dimensiones {
    peso:      Distancia;
    volumen:   Distancia;
    distancia: Distancia;
}

export interface Distancia {
    min: number;
    max: number;
}

export interface Precio {
    normal:  number;
    express: number;
}