import { Empleado } from "./empleado";

export class Auth{
    constructor(auth:boolean=false,accessToken:string="",reason:string="",data:string=""){
        this.auth=auth;
        this.accessToken=accessToken;
        this.reason=reason;
        this.data=data;
    }

    auth:boolean;
    accessToken:string;
    reason:string;
    data:string;
}