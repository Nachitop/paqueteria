const jwt = require('jsonwebtoken');
const Empleado=require('../models/empleado')

verifyToken = (req, res, next) => {
	let token = req.headers['x-access-token'];
	console.log(token);
	if (!token){
		return res.json({ 
			auth: false, message: 'No token provided.' 
		});
	}
 
	jwt.verify(token, 'my_secret_token', (err, decoded) => {
		if (err){
			return res.json({ 
					auth: false, 
					message: 'Fail to Authentication. Error -> ' + err 
				});
		}
	//	req.userId = decoded.id;
		next();
	});
}
 
isGerente = (req, res, next) => {
	let email= req.headers.user;
	console.log(req.headers.user);
	
	Empleado.findOne({email:email})
		.then(user => {
			if(user.puesto==="Admin" || user.puesto==="Gerente(a)"){
				next();
				return;
			}
			else{
				return res.json({mensaje:"Requiere permisos de Gerente(a) o Admin"})
			}
	
			
		});
}
 
isPmOrAdmin = (req, res, next) => {
	
	User.findById(req.userId)
		.then(user => {
			user.getRoles().then(roles => {
				for(let i=0; i<roles.length; i++){					
					if(roles[i].name.toUpperCase() === "PM"){
						next();
						return;
					}
					
					if(roles[i].name.toUpperCase() === "ADMIN"){
						next();
						return;
					}
				}
				
				res.json("Require PM or Admin Roles!");
			})
		})
}
 
const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isGerente = isGerente;
authJwt.isPmOrAdmin = isPmOrAdmin;
 
module.exports = authJwt;