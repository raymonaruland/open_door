'use strict'
const Product = require("../models/product.model")

exports.findAll = function(req,res){
    console.log('received');
    Product.findAll(function(err,product){
        if(err){
            res.send({status:"-1",error:err,message:"Unable to Get product Data!"});
        }else{
            res.send({status:"1",error:false,message:"successfully Got The product Data!",data:product});
        }
    })
}
exports.findById = function(req,res){
    if(req.params.id){
        Product.findById(req.params.id, function(product, err){
            if(err){
                res.send({status:"-1",error:err,message:"Unable to Get product Data!"});
            }else{
                res.send({status:"1",error:false,message:"successfully Got The product Data!",data:product});
            }
        })
    }else{
        res.send({status:-1, message:"Please Provide All Fields"})
    }
}
exports.create = function(req,res){
    const new_Product = new Product(req.body);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Product.create(new_Product, function(err, product) {
            if (err)
                res.send({status:"-1",error:err,message:"product created Failed!"});
                res.send({status:"1",error:false,message:"product created successfully!",data:product});
        });
    }
}
exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Product.update(req.params.id, new Product(req.body), function(err, Project) {
        if (err)
            res.send({status:"-1",error:err,message:"Unable to update product!"});
            res.send({status:"1", error:false, message: 'product successfully updated' });
        });
    }
};
exports.delete = function(req, res) {
    Product.delete( req.params.id, function(err, product) {
        if (err)
            res.send({status:"-1",error:err,message:"Unable to delete product!"});
            res.send({status:"1", error:false, message: 'product successfully deleted' });
    });
};
exports.DashboardReportCount = function(req,res){
    Product.getDashboardCount(function(err,product){
        if(err){
            res.send({status:"-1",error:err,message:"Unable to Get product Data!"});
        }else{
            res.send({status:"1",error:false,message:"successfully Got The product Data!",data:product});
        }
    })
}