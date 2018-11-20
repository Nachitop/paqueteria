import { Empleado } from "./empleado";

export class Auth{
    constructor(auth:boolean=false,accessToken:string="",reason:string="",data:string="",data2:Empleado=new Empleado()){
        this.auth=auth;
        this.accessToken=accessToken;
        this.reason=reason;
        this.data=data;
        this.data2=data2;
    }

    auth:boolean;
    accessToken:string;
    reason:string;
    data:string;
    data2:Empleado;
}