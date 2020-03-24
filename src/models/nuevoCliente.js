const mongoose = require('mongoose');
const {Schema} = mongoose;

const Clientes = new Schema({
    Cedula:{type:String, required:true},
    Nombre:{type:String, required:true},
    Apellido:{type:String, required:true},
    Correo:{type:String, required:true},
    Num_telef:{type:String, required:false},
    Tipo_membresia:{type:String, required:false},
    Estado:{type:String, required:false}, 
    Ini_membresia:{type:String, required:false}, 
    Fin_membresia:{type:String, required:false} 
});

module.exports = mongoose.model('Clientes',Clientes);