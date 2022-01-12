var express = require('express');
var router = express.Router();

let orderController = require('../controllers/order');

router.post('/createOrder/', orderController.createOrder);

router.get('/displayOrders/', orderController.displayOrders);

router.get('/:username', orderController.displayOrderList);

router.get('/getOrder/:orderId', orderController.getOrderById);

router.post('/updateOrderStatus/:orderId', orderController.updateStatus);

module.exports = router;
