const mongoose=require('mongoose');
const URI='mongodb://localhost/paqueteria8';
mongoose.connect(URI)
.then(db=> console.log('Db is connected'))
.catch(err=> console.error(err));

module.exports=mongoose;