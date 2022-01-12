// create a reference to the model
let Order = require('../models/order');

module.exports.displayOrderList = (req, res, next) => {
    Order.find({ userId: req.params.username },(err, orderList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.send({"order": orderList})      
        }
    });
}

module.exports.getOrderById = (req, res, next) => {
    console.log(req.params.orderId);
    Order.find({ orderId: req.params.orderId },(err, orderList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.send({"order": orderList})      
        }
    });
}

// module.exports.getUser = (req, res, next) => {
//     User.find({ username: req.params.username }, (err, user) => {
//         if(err)
//         {
//             return console.error(err);
//         }
//         else
//         {
//             res.send({"user": user})      
//         }
//     });
// }

// module.exports.isAuthorized = (req, res, next) => {
//     let query = req.body.password ? 
//         { $and: [ { username: { $eq: req.body.username } }, { password: { $eq: req.body.password } } ] } 
//         : { username: { $eq: req.body.username } } 
//     User.find(query, (err, user) => {
//         if(err)
//         {
//             return console.error(err);
//         }
//         else
//         {
//             res.send({"message": user.length > 0 ? "success" : "failure"})      
//         }
//     });
// }

module.exports.updateStatus = (req, res, next) => {
    Order.updateOne( { orderId: req.params.orderId } , { $set: { orderStatus: req.body.orderStatus, cancellationReason: req.body.cancelReason, cancellationDesc: req.body.cancelDescription }} , (err, order) =>{
        if(err)
        {
            return console.log(err);
        }
        else
        {
            res.send({"message": order.nModified > 0 ? "success" : "failure"})  
        }
    });
}

module.exports.createOrder = (req, res, next) => {
    console.log(req.body.orderId);
    let newOrder = Order({
        "orderId":req.body.orderId,
        "userId": req.body.userId,
        "orderStatus": req.body.orderStatus,
        "products": req.body.products,
        "orderAddress":req.body.orderAddress,
        "orderAmount":req.body.orderAmount,
        "orderDeliveryDate":req.body.orderDeliveryDate,
        "orderPlacedDate":req.body.orderPlacedDate
    });

    Order.create(newOrder, (err, order) =>{
        if(err)
        {
            return console.log(err);
        }
        else
        {
            order.save();
            res.send({"message": order ? "success" : "failure"})
        }
    });
}

// To Retrieve the Order's List
module.exports.displayOrders = (req, res, next) => {
    Order.find((err, orderList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.send({"orders": orderList})
        }
    });
}
