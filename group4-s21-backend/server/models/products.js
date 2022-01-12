// author: Samir Anwar Rana & Aparna Vivekanandan
let mongoose = require('mongoose');

const schema  = {
    "productId": String,
    "productName": String,
    "productDescription": String,
    "productPrice": String,
    "productStockUnits": String,
    "productImage": String,
    "categories": String,
    "productReview":[]
}

let productModel = mongoose.Schema(schema , { collection: 'Products'});
module.exports = mongoose.model('Products', productModel);