const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { productController } = require('../controllers');
const { check } = require('express-validator');

//Para guardar
const storageProduct = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(__dirname, '../../public/images'));
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	},
});

//Middleware para guardar archivos
const uploadFileProduct = multer({ storageProduct });

// LISTADO DE PRODUCTOS DEL VENDEDOR
router.get('/list', productController.showList);

// LISTADO DE PRODUCTOS DE CARA AL COMPRADOR
router.get('/catalog', productController.showCatalog);

//CREACIÓN DE PRODUCTOS
router.get('/add-item', productController.showAddItem);
router.post('/add-item', uploadFileProduct.single('imagefile'), productController.storeAddItem);

// EDICIÓN DE PRODUCTOS
// Mostrar el producto a editar.
router.get('/edit-item/:id', productController.showEditItem);
// Manda la info editada y redirige al detalle de producto.
router.post('/edit-item/:id', uploadFileProduct.single('imagefile'), productController.updateItem);

// DETALLE DE UN PRODUCTO
router.get('/detail/:id?', productController.showDetail);

//ELIMINAR PRODUCTOS
router.delete('/:id', productController.deleteItem);
// GET shopping-cart page.
router.get('/shopping-cart', productController.showShoppingCart);

module.exports = router;
