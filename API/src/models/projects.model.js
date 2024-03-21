'use strict';
var dbConn = require('./../../config/db.config');
var table_name = 'm_projects';
//Projects object create
var Projects = function (projects) {
    if(projects.id)
        this.id   = projects.id;
    if(projects.project_name)
        this.project_name  = projects.project_name;
    if(projects.product_id)
        this.product_id   = projects.product_id;
    if(projects.client)
        this.client  = projects.client;
    if(projects.description)
        this.description   = projects.description;
    if(projects.status)
        this.status  = projects.status;
   
};
Projects.create = function (new_Projects, result) {
    var query_ = "INSERT INTO "+table_name+" set ?";
    dbConn.query(query_, new_Projects, function (err, res) {
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
Projects.findById = function (id, result) {
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
Projects.findAll = function (result) {
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
Projects.update = function (id, projects, result) {
    dbConn.query("UPDATE "+table_name+" SET ? WHERE id = ?", [projects, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Projects.delete = function (id, result) {
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
module.exports = Projects;