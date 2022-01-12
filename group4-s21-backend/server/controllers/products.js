// author: Samir Anwar Rana & Aparna Vivekanandan
let Products = require('../models/products');

module.exports.displayProducts = (req, res, next) => {
    Products.find((err, productList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.send({"products": productList})
        }
    });
}

module.exports.displayBirthdayProducts = (req, res, next) => {
    Products.find({productType : "Birthday"}, (err, productList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.send({"products": productList})
        }
    });
}

module.exports.getProduct = (req, res, next) => {
    Products.find({ productId : req.params.id }, (err, product) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.send({"products": product})      
        }
    });
}

module.exports.getProductByProductId = (req, res, next) => {
    Products.find({ productId : req.params.id }, (err, product) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.send({"products": product})      
        }
    });
}

module.exports.displayAnniversaryProduct = (req, res, next) => {
    Products.find({productType : "Anniversary"}, (err, productList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.send({"products": productList})
        }
    });
}

module.exports.displayWeddingProducts = (req, res, next) => {
    Products.find({productType : "Wedding"}, (err, productList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.send({"products": productList})
        }
    });
}


module.exports.displayBonProducts = (req, res, next) => {
    Products.find({productType : "Bon"}, (err, productList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.send({"products": productList})
        }
    });
}

module.exports.addReview = (req, res, next) => {

    Products.updateOne( { productId: req.body.productId } , { $push: {"productReview": {reviewHeadline: req.body.reviewHeadline, reviewDesc: req.body.reviewDesc, startRating: req.body.startRating}} } , (err, user) =>{
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

module.exports.getProductsByName = (req, res, next) => {
    Products.find({productName : {$regex : ".*"+req.params.name+".*"}}, (err, productList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.send({"products": productList})
        }
    });
}

module.exports.getProductById = (req, res, next) => {
    console.log(req.params.id)
    Products.find({ _id : req.params.id }, (err, product) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.send({"products": product})      
        }
    });
}

