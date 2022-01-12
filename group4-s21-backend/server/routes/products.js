// author: Samir Anwar Rana & Aparna Vivekanandan
var express = require('express');
var router = express.Router();

let productController = require('../controllers/products');

router.get('/displayProducts', productController.displayProducts);

router.get('/displayProducts/:id', productController.getProduct);

router.get('/displayWishlistProducts/:id', productController.getProductById);

router.get('/getProducts/:id', productController.getProductByProductId);

router.get('/getProductsByName/:name', productController.getProductsByName);

router.get('/displayBirthdayProducts', productController.displayBirthdayProducts);

router.get('/displayBirthdayProducts/:id', productController.getProduct);

router.get('/displayAnniversaryProducts', productController.displayAnniversaryProduct);

router.get('/displayAnniversaryProducts/:id', productController.getProduct);

router.get('/displayWeddingProducts', productController.displayWeddingProducts);

router.get('/displayWeddingProducts/:id', productController.getProduct);

router.get('/displayBonProducts', productController.displayBonProducts);

router.get('/displayBonProducts/:id', productController.getProduct);

router.post('/addReview', productController.addReview);

module.exports = router;
