'use strict'
const Projects = require("../models/projects.model")

exports.findAll = function(req,res){
    console.log('received');
    Projects.findAll(function(Projects, err){
        if(err){
            res.send({status:"-1",error:err,message:"Unable to Get Project Data!"});
        }else{
            res.send({status:"1",error:false,message:"successfully Got The Projects Data!",data:Projects});
        }
    })
}
exports.findById = function(req,res){
    if(req.params.id){
        Projects.findById(req.params.id, function(project, err){
            if(err){
                res.send({status:"-1",error:err,message:"Unable to Get Project Data!"});
            }else{
                res.send({status:"1",error:false,message:"successfully Got The Project Data!",data:Project});
            }
        })
    }else{
        res.send({status:-1, message:"Please Provide All Fields"})
    }
}
exports.create = function(req,res){
    const new_Project = new Projects(req.body);
    //handles null error
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Projects.create(new_Project, function(err, Project) {
            if (err)
                res.send({status:"-1",error:err,message:"Project created Failed!"});
                res.send({status:"1",error:false,message:"Project created successfully!",data:Project});
        });
    }
}
exports.update = function(req, res) {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.status(400).send({ error:true, message: 'Please provide all required field' });
    }else{
        Projects.update(req.params.id, new Projects(req.body), function(err, Project) {
        if (err)
            res.send({status:"-1",error:err,message:"Unable to update Project!"});
            res.send({status:"1", error:false, message: 'Project successfully updated' });
        });
    }
};
exports.delete = function(req, res) {
    Projects.delete( req.params.id, function(err, Project) {
        if (err)
            res.send({status:"-1",error:err,message:"Unable to delete Project!"});
            res.send({status:"1", error:false, message: 'Project successfully deleted' });
    });
};