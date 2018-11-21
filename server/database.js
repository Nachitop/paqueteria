const mongoose=require('mongoose');
//const URI='mongodb://localhost/paqueteria8';
const URI='mongodb://nacho:admin123@ds039017.mlab.com:39017/paqueteria8';
mongoose.connect(URI)
.then(db=> console.log('Db is connected'))
.catch(err=> console.error(err));

module.exports=mongoose;