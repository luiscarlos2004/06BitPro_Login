const mongoose = require('mongoose');
const {Schema,model} = mongoose;
let usersf = new Schema({
    ids: String,
    nombre: String,
    apellido: String,
    username: String,
    correo: String,
    direccion: String,
    pais: String,
    estado: String,
    cp: String,
    mayor:Boolean,
    terminos:Boolean
})

module.exports = model('usersR',usersf);