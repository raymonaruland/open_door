'use strict';
var jwt=require('jsonwebtoken');
const UserList = require('../models/user_list.model');
var connection = require('../../config/db.config');
exports.authenticate=function(req,res){
	try{
		//var name=req.body.email;
		var name=req.body.username;
		//console.log(req.body)
		var password=req.body.password;
		//connection.query('SELECT a.*,b.id as role_id,b.role FROM m_user a JOIN m_roles b ON a.role_map = b.id WHERE a.status != -1 and a.email = ?',[name], function (error, results, fields) {
		connection.query('SELECT a.*,b.id as role_id,b.role FROM m_user a JOIN m_roles b ON a.role_map = b.id WHERE a.status = 1 and a.loginName = ?',[name], function (error, results, fields) {
		if (error) {
			console.log(error)
			res.json({
				status:-1,
				message:'there are some error with query',
				})
		}else{
			if(results.length >0){
				if(password==results[0].password){
					const payload = {
						admin: results[0].name 
					};
					const token = jwt.sign(payload, process.env.SECRET_KEY, {
						expiresIn: 3600
					});
					var query = connection.query('SELECT a.id,a.display_name as title,a.description,a.menu_name as methods,c.menu_id as menu_id,a.type,'+results[0].role_id+' as role_id,a.code,c.user_id,'
						+'CASE'
						+'	WHEN c.menu_id IS NULL THEN "0"'
						+'	ELSE "1" '
						+' END as permission'
						+' from m_menu a'
						//+' JOIN t_role_menu_mapping b ON a.id = b.menu_id and b.status = 1 and b.role_id =  "'+results[0].role_id+'"'
						+' JOIN t_user_activity_permissions_mapping c ON a.id = c.menu_id and c.status = 1 and c.user_id =  "'+results[0].id+'"'
						+' WHERE a.status = 1 order by a.menu_order',function(err,rows)
						//+' WHERE a.status = 1 and a.type = "menu" order by a.menu_order',function(err,rows)
					{
						if(err){
							console.log(err)
							results[0]['menu'] = [];
							res.json({
								status:1,
								token:token,
								data:results
							})
						}
						else{
							results[0]['menu'] = rows;
							res.json({
								status:1,
								token:token,
								data:results
							})
						}
					});
				}else{
					res.json({
					status:0,                  
					message:"Login name and password does not match"
					});
				}
			}
			else{
				res.json({
					status:0,
					message:"Your Account does not exits! Please contact Admin."
				});
			}
		}
		});

	}catch(ex){
		console.log(ex);
	}
}

exports.forgot_password = function(req, res) {
	var ores = res;
	var input = JSON.parse(JSON.stringify(req.body));
	res.setHeader('Content-Type', 'application/json');
	UserList.forgotPassword(input,function(rec){
		if(rec == -1){
			var data = {status:"-1", data:'Failed while sending forgot password link'};
		}
		if(rec == 0){
			var data = {status:"0", data:'This email address is not registered with ATS. If you are a new user, Contact Admin.'};
		}
		else{
			var data = {status:"1", data:'Cool! Password recovery instruction has been sent to your email.'};
		}
		console.log(data)
		ores.send(JSON.stringify(data));
	});
};

exports.reset_password = function(req, res) {
	var ores = res;
	var input = JSON.parse(JSON.stringify(req.body));
	res.setHeader('Content-Type', 'application/json');
	UserList.resetPassword(input,function(rec){
		if(rec == -1){
			var data = {status:"-1", data:'Failed while updating your password'};
		}
		if(rec == 0){
			var data = {status:"0", data:'Password reset is not not success.'};
		}
		else{
			var data = {status:"1", data:'Password reset is Success.'};
		}
		ores.send(JSON.stringify(data));
	});
};

exports.logout = function(req, res) {
	var ores = res;
	var input = JSON.parse(JSON.stringify(req.query));
	// console.log(input)
	UserList.updateLastLoginTs(input,function(rec){
		if(rec == 1){
			var data = {status:"1", data:'Failed to get user role!'};
		}
		 res.sendFile(__dirname + '/public/html/login.html');
	});
	//res.redirect('/login');
	
};