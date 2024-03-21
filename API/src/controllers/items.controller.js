'use strict'
const Items = require("../models/items.model")

exports.findAll = function (req, res) {
    console.log('received');
    Items.findAll(function (err, Items) {
        if (err) {
            res.send({ status: "-1", error: err, message: "Unable to Get Items Data!" });
        } else {
            res.send({ status: "1", error: false, message: "successfully Got The Items Data!", data: Items });
        }
    })
}
exports.findById = function (req, res) {
    if (req.params.id) {
        Items.findById(req.params.id, function (err, Items) {
            if (err) {
                res.send({ status: "-1", error: err, message: "Unable to Get Items Data!" });
            } else {
                res.send({ status: "1", error: false, message: "successfully Got The Items Data!", data: Items });
            }
        })
    } else {
        res.send({ status: -1, message: "Please Provide All Fields" })
    }
}
exports.create = function (req, res) {
    const new_Items = new Items(req.body);
    //handles null error
    console.log("___ new_Items ___", new_Items)
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Items.create(new_Items, function (err, Items) {
            if (err)
                res.send({ status: "-1", error: err, message: "Items created Failed!" });
            res.send({ status: "1", error: false, message: "Items created successfully!", data: Items });
        });
    }
}
exports.update = function (req, res) {
    console.log("___ new_Items ___", req.body)
    Items.update(req.params.id, new Items(req.body), function (err, Items) {
        if (err)
            res.send({ status: "-1", error: err, message: "Unable to update Items!" });
        res.send({ status: "1", error: false, message: 'Items successfully updated' });
    });
};
exports.delete = function (req, res) {
    Items.delete(req.params.id, function (err, Items) {
        if (err)
            res.send({ status: "-1", error: err, message: "Unable to delete Items!" });
        res.send({ status: "1", error: false, message: 'Items successfully deleted' });
    });
};