const routerP = require("express").Router();
const {
    obtenerProductos,
    crearProducto,
    eliminaProducto,
    modificarProducto
} = require('../controllers/productos');

routerP.get('/', obtenerProductos)
routerP.post('/', crearProducto)
routerP.put('/:nombre', modificarProducto)
routerP.delete('/', eliminaProducto)

module.exports = routerP;

