const mongoose = require('mongoose');
const UniqueValidator = require('mongoose-unique-validator');
const crypto = require("crypto");
const jwt = require("jsonwebtoken")

const SchemaUsuario = mongoose.Schema({
    nombre: {
        type: String, uniqe: true, require: true
    },
    email: {
        type: String, uniqe: true, require: true, match: [/\S+@\S+\.\S+/, "es inválido"], index: true

    },
    username: {
        type: String, uniqe: true, require: true, lowercase: true, match: [/^[a-zA-Z0-9]+$/, "es inválido"], index: true
    },
    hash: String,
    salt: String,
    tarjeta: String,
    tipo: {
        type: String, enum: ['vendedor', 'comprador']
    },
},{timestamp: true});

SchemaUsuario.plugin(UniqueValidator, { message: "El usuario ya existe"})

SchemaUsuario.methods.crearContrasena = function(password){
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex")
}

SchemaUsuario.methods.validarContrasena = function(password){
    const pass = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex")
    return pass === this.hash
}

SchemaUsuario.methods.generarJWT = function() {
    const today = new Date();
    const exp = new Date ();

    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime()/1000)
    }, process.env.SECRET)
}


SchemaUsuario.methods.toAuthJSON = function (){
    return {
        username : this.username,
        email: this.email,
        token: this.generarJWT()

    }
}
 SchemaUsuario.methods.publicData = function (){
    return {
        username : this.username,
        email : this.email,
        nombre: this.nombre,
        tipo: this.tipo
    }
 }

const Usuario = mongoose.model("Usuario", SchemaUsuario)
module.exports = Usuario



