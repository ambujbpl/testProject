module.exports = {
    "service": "gmail",
    "mysqldb": {

        // // Local System Db Connector
        "host": "localhost",
        "user": "root",
        "password": "root",
        "database": "local_user_db",
        "multipleStatements": true,
    },
    "authentication": {
        "type": "OAuth2",
        "user": "trackandtracesolution@gmail.com",
        "pass": "1234wxyz",
        "clientId": "688795442592-1i8od9i2gddvepukkjc4sevdmdefgpuq.apps.googleusercontent.com",
        "clientSecret": "z31H1ShSC6KiRTYbqHx47KuG",
        "refreshToken": "1/UbI5GRpUMcpPUUMHjhCcJ7UOSW21JWcg74sQarMMeaE",
        "accessToken": "ya29.GlvrBeM1QIiECDBHfSNfenn0bu74Dyvm4-0UP_7ib3xm1p201MO7WyxKF5torDC7N5Uyd8RFL7yDWna77HH9zDW2Cpc0zQZIGazj2ViVF2SKrMmaxlk5j5thLcFN",
    },
    "maillist": {
        "admin1": "trackandtracesolution@gmail.com",
        "admin2": "ambuj@ideata-analytics.com",
        "admin3": "ambuj.ideata@gmail.com",
        "admin4": "pranjaldkjain2@gmail.com",
        "admin5": "pranjaljain@ideata-analytics.com",
        "admin6": "Bhairavee.Wagh@skf.com",
    },
    "cognito": {
        "production": false,
        "region": 'us-east-1',
        "identityPoolId": 'us-east-1:02617822-8234-4870-a1ee-e16a3b5e9f6b',
        "userPoolId": 'us-east-1_Dbw0EEXMS',
        "clientId": '6l4o48ojadca18gat0rgdldn14',
        "rekognitionBucket": 'rekognition-pics',
        "albumName": "usercontent",
        "bucketRegion": 'us-east-1',
        "ddbTableName": 'LoginTrail',
        "cognito_idp_endpoint": '',
        "cognito_identity_endpoint": '',
        "sts_endpoint": '',
        "dynamodb_endpoint": '',
        "s3_endpoint": ''
    },
    "secret": 'keyboard cat',
    "limit": 1000,
    "limit_admin": 5000,
    "default_user": "user",//admin
    "file_path":"/var/fileUpload/",
    "mainUrl": "http://localhost:5000/",
    // "mainUrl": "http://www.skf.com/",
    // "mode": "development",   //when app run in local server
    "mode": "production",       //when app run in aws server
    "siteUrl":["http://track.ideata-analytics.com/login","http://track-and-trace.ap-south-1.elasticbeanstalk.com/login"],
    "CustomerCodeLength":9,
};