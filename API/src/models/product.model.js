'use strict';
var dbConn = require('./../../config/db.config');
var table_name = 'm_products';
//Product object create
var Product = function (product) {
    if(product.id)
        this.id   = product.id;
    if(product.product_name)
        this.product_name  = product.product_name;
    if(product.type)
        this.type   = product.type;
    if(product.description)
        this.description  = product.description;
    if(product.rate)
        this.rate   = product.rate;
    if(product.status)
        this.status  = product.status;
   
};
Product.create = function (new_Product, result) {
    var query_ = "INSERT INTO "+table_name+" set ?";
    dbConn.query(query_, new_Product, function (err, res) {
        if (err) {
            console.log("creating Form error: ", err);
            result(err, null);
        }
        else {
            console.log(res);
            result(null, res);
        }
    });
};
Product.findById = function (id, result) {
    dbConn.query("Select * from "+table_name+ " where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Product.findAll = function (result) {
    var query_ = "Select * from "+table_name+" WHERE status != -1";
    dbConn.query(query_, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('users : ', res);
            result(null, res);
        }
    });
};
Product.update = function (id, product, result) {
    dbConn.query("UPDATE "+table_name+" SET ? WHERE id = ?", [product, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Product.delete = function (id, result) {
    dbConn.query("UPDATE "+table_name+" SET status=-1 WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Product.getDashboardCount = function (result) {
    var query_ = "SELECT count(id) as total,(SELECT count(id) as products FROM "+table_name+" where type = 'Product' and status != -1) as products,(SELECT count(id) as services FROM "+table_name+" where type = 'Service' and status != -1) as services FROM "+table_name+" where status != -1";
    dbConn.query(query_, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('users : ', res);
            result(null, res);
        }
    });
};
module.exports = Product;