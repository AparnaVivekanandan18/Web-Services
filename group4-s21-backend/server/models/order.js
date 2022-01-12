let mongoose = require('mongoose');

const schema  = {
    "orderId": String,
    "userId": String,
    "orderStatus": String,
    "products": [{
        "categories":String,
        "productCount":Number,
        "productDescription":String,
        "productId":String,
        "productImage":String,
        "productName":String,
        "productPrice":String,
        "productReview":[],
        "productStockUnits":String,
        "productType":String,
        "prouductType":String,
        "totalSum":Number
    }],
    "orderAddress": [{
        "deliveryName": String,
        "aptNo": Number,
        "streetName": String,
        "city": String,
        "postalCode": String,
        "modeOfPayment":String
    }],
    "orderAmount":String,
    "orderDeliveryDate":String,
    "orderPlacedDate":String,
    "cancellationReason":String,
    "cancellationDesc":String
}

let orderModel = mongoose.Schema(schema , { collection: 'Orders' });
module.exports = mongoose.model('Orders', orderModel);