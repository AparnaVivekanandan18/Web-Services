// author: Anjali Chaudhary
// create a reference to the model
let User = require('../models/user');

module.exports.displayUserList = (req, res, next) => {
    User.find((err, userList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.send({"user": userList})      
        }
    });
}

module.exports.getUser = (req, res, next) => {
    User.find({ username: req.params.username }, (err, user) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.send({"user": user})      
        }
    });
}

module.exports.isAuthorized = (req, res, next) => {
    let query = req.body.password ? 
        { $and: [ { username: { $eq: req.body.username } }, { password: { $eq: req.body.password } } ] } 
        : { username: { $eq: req.body.username } } 
    User.find(query, (err, user) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.send({"message": user.length > 0 ? "success" : "failure"})      
        }
    });
}

module.exports.updatePassword = (req, res, next) => {
    User.updateOne( { username: req.body.username } , { $set: { password: req.body.password.value }} , (err, user) =>{
        if(err)
        {
            return console.log(err);
        }
        else
        {
            res.send({"message": user.nModified > 0 ? "success" : "failure"})  
        }
    });
}

module.exports.register = (req, res, next) => {

    let newUser = User({
        "username": req.body.username.value,
        "password": req.body.password.value,
        "firstname": req.body.firstname.value,
        "lastname": req.body.lastname.value,
        "cart": [],
        "wishlist": []
    });

    User.create(newUser, (err, user) =>{
        if(err)
        {
            return console.log(err);
        }
        else
        {
            res.send({"message": user ? "success" : "failure"})  
        }
    });
}

module.exports.update = (req, res, next) => {

    let updatedUser = User({
        "_id": req.body.userId,
        "username": req.body.username.value,
        "password": req.body.password.value,
        "firstname": req.body.firstname.value,
        "lastname": req.body.lastname.value,
        "cart": req.body.cart,
        "wishlist": req.body.wishlist
    });

    User.updateOne( { _id: req.body.userId } , { $set: updatedUser } , (err, user) =>{
        if(err)
        {
            return console.log(err);
        }
        else
        {
            res.send({"message": user.nModified > 0 ? "success" : "failure"})  
        }
    });
}

module.exports.delete = (req, res, next) => {

    User.remove( { _id: req.body.userId } , (err, user) =>{
        if(err)
        {
            return console.log(err);
        }
        else
        {
            res.send({"message": user.deletedCount > 0 ? "success" : "failure"})  
        }
    });
}

module.exports.addProduct = (req, res, next) => {

    User.updateOne( { username: req.body.username } , { $push: {"cart": {giftId: req.body.productId,  quantity: req.body.quantity}} }  , (err, user) =>{
        if(err)
        {
            return console.log(err);
        }
        else
        {
            res.send({"message": user.nModified > 0 ? "success" : "failure"})  
        }
    });
}

module.exports.updateCartProductQuantity = (req, res, next) => {
    console.log("username",req.body.username)
    console.log("productId",req.body.productId)

    User.findOne({ username: req.body.username }).then(user=>{
        console.log(user)
        let product = user.cart.filter((element)=> {return element.giftId == req.body.productId});
        product[0]['quantity'] = req.body.quantity;
        console.log(product)
        user.save();
        res.send({"message": user.nModified > 0 ? "success" : "failure"})
    })
}

module.exports.deleteCartProduct = (req, res, next) => {
    console.log("username",req.body.username)
    console.log("productId",req.body.productId)

    User.findOne({ username: req.body.username }).then(user=>{
        console.log(user)
        let cart = user.cart.filter((element)=> {return element});
        let productToBeDeletedIndex = cart.findIndex((product)=>{return (product.giftId == req.body.productId)})
        cart.splice(productToBeDeletedIndex,1)
        user.cart = cart
        console.log("productToBeDeletedIndex",productToBeDeletedIndex)
        console.log("After Delete",cart)
        user.save()
        res.send({"message": user.nModified > 0 ? "success" : "failure"})
    })
}

module.exports.deleteWholeCart = (req, res, next) => {
    console.log("username",req.body.username)
    console.log("productId",req.body.productId)

    User.findOne({ username: req.body.username }).then(user=>{
        user.cart = []
        user.save()
    })
}

module.exports.addWishList = (req, res, next) => {

    User.updateOne( { username: req.body.username } , { $set: {"wishlist": req.body.wishlist }} , (err, user) =>{
        if(err)
        {
            return console.log(err);
        }
        else
        {
            res.send({"message": user.nModified > 0 ? "success" : "failure"})  
        }
    });
}