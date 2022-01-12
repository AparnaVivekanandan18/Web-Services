// author: Anjali Chaudhary
var express = require('express');
var router = express.Router();

let userController = require('../controllers/user');

router.get('/', userController.displayUserList);

router.get('/:username', userController.getUser);

router.post('/authorize', userController.isAuthorized);

router.post('/updatePassword', userController.updatePassword);

router.post('/register', userController.register);

router.post('/update', userController.update);

router.post('/delete', userController.delete);

router.post('/addproduct', userController.addProduct)

router.post('/updateCartProductQuantity', userController.updateCartProductQuantity)
router.post('/deleteCartProduct', userController.deleteCartProduct)
router.post('/deleteWholeCart', userController.deleteWholeCart)

router.post('/addwishlist', userController.addWishList)

module.exports = router;
