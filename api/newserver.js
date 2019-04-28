var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var moment = require('moment');
var config = require('./config/config.js');
var pool = require('./config/dbconfig.js');
var nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
var path = require('path');
var schedule = require('node-schedule');
var loopback = require("loopback");
app.use(loopback.static(path.resolve(__dirname, '../dist')));

var transporter = nodemailer.createTransport({
    service: config.service,
    auth: {
        type: config.authentication.type,
        user: config.authentication.user,
        pass: config.authentication.pass,
        clientId: config.authentication.clientId,
        clientSecret: config.authentication.clientSecret,
        refreshToken: config.authentication.refreshToken,
        accessToken: config.authentication.accessToken,
    },
})
// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.listen(2000, () => {
	console.log("application running in port 2000");
});

app.post('/createUser', function(req, res, next) {
    console.log("req.body : ", req.body);
    pool.getConnection(function(err, connection) {
        connection.query('SELECT * FROM users WHERE email = "' + req.body.email + '" or user_name = "' + req.body.user_name + '"', function(err, result) {
            if (err) {
                return next(err);
            } else {
                console.log("result : ", result);
                if (result != '') {
                    if (result[0].email == req.body.email) {
                        return res.json({
                            "resCode": "Error",
                            "msg": "Email is already used",
                        });
                    } else if (result[0].user_name == req.body.user_name) {
                        return res.json({
                            "resCode": "Error",
                            "msg": "User Name already Register",
                        });
                    } else {
                        return res.json({
                            "resCode": "Error",
                            "msg": "User Already Register",
                        });
                    }
                } else if (result == '') {
                    connection.query('INSERT INTO users (email,user_name) VALUES ("' + req.body.email + '","' + req.body.user_name + '");', function(err, result) {
                        if (err) {
                            return next(err);
                        } else {
                        	connection.query('select id from users WHERE user_name="' + req.body.user_name + '";', function(err, result) {
	                        if (err) {
	                            return next(err);
	                        } else {
	                        	console.log("result : ", result);
		                        var maillist = [
	                                req.body.email,
	                            ];
	                            console.log("maillist : ", maillist)
	                            var subject = "Hi " + req.body.user_name + ", welcome to Our System!";
	                            var body = '<html><head><title>Welcome</title></head><body><h1><b>Dear ' + req.body.user_name + ',</b></h1><p>Thank you for joining Our System. Your account is now active.</p>' + '<p>Enjoy the rest of your day!</p>' + '<p>Kind Regards,</p>' + '<p>XYZ system;</p> ' + ' <p><a href="http://localhost:2000/addMoreUserInformation?id=' + result[0].id +'" +>Redirect To Login</a></p></body></html>';
	                            var mailOptions = {
	                                // from: 'trackandtracesolution@gmail.com',
	                                from: config.authentication.user,
	                                to: maillist,
	                                bcc: "ambuj@ideata-analytics.com",
	                                subject: subject,
	                                html: body
	                            };

	                            transporter.sendMail(mailOptions, function(error, info) {
	                                if (err) {
	                                    return next(err);
	                                } else {
	                                    console.log('Email sent: ' + info.response);
	                                }
	                            });
	                            return res.json({
	                                "resCode": "OK",
	                                "msg": "User creat successfully",
	                            });
		                        }
	                        });	
                            
                        }
                    });
                } else {
                    return res.json({
                        "resCode": "Error",
                        "msg": "User Already Register",
                    });
                }
            }
        });
        connection.release();
        if (err) {
            console.log(err);
        }
    });
});

app.get('/getUsersList', function(req, res, next) {
    console.log("req.body : ", req.body);
    var query = "SELECT * FROM users;";
    pool.getConnection(function(err, connection) {
        connection.query(query, function(err, result) {
            if (err) {
                return next(err);
            } else {
                console.log("result : ", result);
                    return res.json({
                        "resCode": "Ok",
                        "data": result,
                    });
            }
        });
        connection.release();
        if (err) {
            console.log(err);
        }
    });
});

// // addMoreUserInformation.html redirect
app.get('/addMoreUserInformation', function(req, res, next) {
    res.sendFile('addMoreUserInformation.html', {
        root: path.resolve(__dirname, '../dist/')
    });
});


app.get('/getUserDetailsById/:id', function(req, res, next) {
    console.log("id");
    console.log("id",req.params.id);
    pool.getConnection(function(err, connection) {
        connection.query('SELECT * FROM users WHERE id = "' + req.params.id + '"', async function(err, result) {
            if (err) {
                return next(err);
            } else {
                if (result != '') {
                  	console.log("result : ", result);
                  	return res.json({
                        "resCode": "Ok",
                        "data": result,
                    });                                     
                } else {
                    console.log("User Not Found by ID : " + req.params.id)
                }
            }
        });
        connection.release();
        if (err) {
            console.log(err);
        }
    });
});

app.post('/updateUserDetailsById', function(req, res, next) {
	console.log("updateUserDetailsById-----------------------");
    pool.getConnection(function(err, connection) {
        connection.query('SELECT * FROM users WHERE id = "' + req.params.id + '"', async function(err, result) {
        	if(result){        	
	        connection.query('UPDATE users SET first_name="' + req.body.first_name + '",last_name="' + req.body.last_name + '",mobile_number="' + req.body.mobile_number + '",status = "T"  where  id = "' + req.body.id + '";', async function(err, result) {
		            if (err) {
		                return next(err);
		            } else {
		                if (result != '') {
		                  	return res.json({
		                        "resCode": "Ok",
		                        "msg": "User Details updated successfully",
		                    });                            
		                
		                } else {
		                    return res.json({
		                        "resCode": "Ok",
		                        "msg": "User Not Found by ID : " + req.params.id,
		                    });
		                }
		            }
		        });	
        	}else{
        		return res.json({
                        "resCode": "Ok",
                        "msg": "User Not Found by ID : " + req.params.id,
                    });
        	}
        });
        connection.release();
        if (err) {
            console.log(err);
        }
    });
});

schedule.scheduleJob('*/15 * * * *', async function(){
  console.log('schedule job every 15 min!');
      pool.getConnection(function(err, connection) {
        connection.query('SELECT * FROM users WHERE status = "F"', async function(err, result) {
            if (err) {
                return next(err);
            } else {
                if (result != '') {
                  	console.log("result : ", result);
     				var subject,body,mailOptions;
                    var mailOptions;

                    await result.forEach( async function(item){
	                    subject = "Hi " + item.user_name + ", welcome to Our System!";
	                    body = '<html><head><title>Welcome</title></head><body><h1><b>Dear ' + item.user_name + ',</b></h1><p>Thank you for joining Our System. Your account is now active.</p>' + '<p>Enjoy the rest of your day!</p>' + '<p>Kind Regards,</p>' + '<p>XYZ system;</p> ' + ' <p><a href="http://localhost:2000/addMoreUserInformation?id=' + item.id +'" +>Redirect To Login</a></p></body></html>';
	                    mailOptions = {
	                        from: config.authentication.user,
	                        to: item.email,
	                        subject: subject,
	                        html: body
	                    };
	                    transporter.sendMail(mailOptions, function(error, info) {
		                        if (err) {
		                            return next(err);
		                        } else {
		                            console.log('Email sent: ' + info.response);
		                        }
                    	});
                    });                                             
                
                } else {
                    console.log("All User Already Registered!")
                }
            }
        });
        connection.release();
        if (err) {
            console.log(err);
        }
    });
});