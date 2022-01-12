// author: Anjali Chaudhary
let mongoose = require('mongoose');

const schema  = {
    "userId": String,
    "username": String,
    "password": String,
    "firstname": String,
    "lastname": String,
    "cart": [{
        "giftId": String,
        "quantity": Number
    }],
    "wishlist": [{
        "wishlistId": String,
        "wishlistName": String,
        "wishlistItems" : [{
            "wishlistItemId": String,
            "giftId": String,
            "quantity": Number
        }]
    }]
}

let userModel = mongoose.Schema(schema , { collection: 'Users' });
module.exports = mongoose.model('Users', userModel);