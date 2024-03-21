const express = require('express');
const router = express.Router();

var common = {

	/**
	 * 
	 * @param { file,upload_path
	 * }  
	 * @param {*} msg 
	 * @param {*} cb 
	 */
	 fileupload: function(req,upload_path,cb) {
		try {
			if(!req.files) {
				var data = {status:"1", data:"No file uploaded"};
				cb.send(JSON.stringify(data));
			} else {
				var mpsfile = req.files.file; 
				console.log(req)
				var file_name = new Date().getTime() +'_'+mpsfile.name;
				var upload_path = upload_path;
				mpsfile.mv(upload_path+file_name, function(err) {
				  if (err){
					  console.log(err)
					var data = {status:"-1", message:"No file moved!"};
					cb(data);
				  }else{
					var data = {status:"1", message:"File moved succressfully!", path:upload_path+file_name,filename:file_name};
					cb(data);
					}
			   });
			}
		} catch (err) {
			var data = {status:"-1", message:"No file moved!",data:err};
			cb(data);
		}
	},
	fileupload_targetvalue: function(req,upload_path,cb) {
		try {
			if(!req.files) {
				var data = {status:"1", data:"No file uploaded"};
				cb.send(JSON.stringify(data));
			} else {
				var mpsfile = req.files.files; 
				//console.log(req)
				var file_name = new Date().getTime() +'_'+mpsfile.name;
				var upload_path = upload_path;
				mpsfile.mv(upload_path+file_name, function(err) {
				  if (err){
					  console.log(err)
					var data = {status:"-1", message:"No file moved!"};
					cb(data);
				  }else{
					var data = {status:"1", message:"File moved succressfully!", path:upload_path+file_name,filename:file_name};
					cb(data);
					}
			   });
			}
		} catch (err) {
			var data = {status:"-1", message:"No file moved!",data:err};
			cb(data);
		}
	},
	/**
	* Added by Elumalai for sending OTP SMS to the particular user 
	* parameter : mobile number, otp
	* Response : OTP Number
	*/
	sendSMS: function(usermobile,msg,cb){
		var request = require('ajax-request');
		//var domain_url = "http://bhashsms.com/api/sendmsg.php?user=orbmixtech&pass=Orbmix@SMS16&sender=STRACK&phone="+usermobile+"&text="+msg+"&priority=ndnd&stype=normal";
		
		var domain_url = "http://117.239.242.114/csms/singlesmsprg.asp?username=stantony&password=STANTONY123&mobile="+usermobile+"&message="+msg;
		request({
			url: domain_url,
			method: 'GET',
				
			}, 
			function(err, res, body) {
				if (err) {
					console.log(err);
					cb(-1,err);
				} 
				else {
					//console.log(res);
					cb(1,res); 
				}
				//console.log(body);
			});
	},
	GetCurrentDate : function(){
		const today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		return start_date = date+' '+time;
	},

	convertTZ : function(date, tzString) {
		tzString = "Asia/Jakarta";
		return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
	}
};	
	
module.exports = common;	

