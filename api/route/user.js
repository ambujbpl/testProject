var express = require('express');
var router = express.Router();
var moment = require('moment');
var config = require('../config/config.js');
var pool = require('../config/dbconfig.js');
router.get('/getUsersList', function(req, res, next) {
    console.log(" ");
    console.log("---------------------------------------Get User List API-------------------------------------------");
    console.log(" ");
    var query = "SELECT * FROM users;";
    pool.getConnection(function(err, connection) {
        console.log("query : ",query);
        connection.query(query, function(err, result) {
            if (err) {
                return next(err);
            } else {
                if (result != '') {
                    return res.json({
                        "resCode": "OK",
                        "users": result,
                    });
                } else {
                    return res.json({
                        "resCode": "Error",
                        "msg": "Users List Not Found"
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

module.exports = router;