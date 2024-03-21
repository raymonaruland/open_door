'use strict';
var dbConn = require('./../../config/db.config');
var table_name = 'items';
//Items object create
var Items = function (Items) {
    if(Items.id)
        this.id   = Items.id;
    if(Items.name)
        this.name  = Items.name;
    if(Items.owner_name)
        this.owner_name   = Items.owner_name;
    if(Items.purchase_date)
        this.purchase_date  = Items.purchase_date;
    if(Items.phone)
        this.phone   = Items.phone;
    if(Items.address)
        this.address   = Items.address;
    if(Items.post_date)
        this.post_date  = Items.post_date;
    if(Items.type)
        this.type   = Items.type;
    if(Items.item_status)
        this.item_status   = Items.item_status;
    if(Items.status)
        this.status  = Items.status;
   
};
Items.create = function (new_Items, result) {
    var query_ = "INSERT INTO "+table_name+" set ?";
    dbConn.query(query_, new_Items, function (err, res) {
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
Items.findById = function (id, result) {
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
Items.findAll = function (result) {
    var query_ = "Select * from "+table_name+" WHERE item_status != 'Sold' AND status != -1";
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
Items.update = function (id, Items, result) {
    dbConn.query("UPDATE "+table_name+" SET ? WHERE id = ?", [Items, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Items.delete = function (id, result) {
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
module.exports = Items;