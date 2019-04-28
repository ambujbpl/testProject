1) Create Database having user information (email, first name, last name etc..). Use any of the
database MySQL, MSSQL;
2) Fetch user information from database i.e. name, email address.
3) Generate Unique Link for each user &amp; send mail on user&#39;s email.
4) User will receive email mail, once user click on Link user will be redirected to Web Page.
5) The link will open a form that will be used by the user to fill in details, user&#39;s email &amp; other
information (present in current database) will be filled automatically.
6) User will then save information that will be saved in database.
7) Once user fill information &amp; save form, it stops the email sequence.
8) Email sequence should be sent to the user in defined time periods till user will not reply.
9) Email sequence should be sent to the user in defined time periods i.e. 30mins,1hr.....



1 user

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(40) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `mobile_number` varchar(18) DEFAULT NULL,
  `status` varchar(3) DEFAULT 'F',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


API 
1 create user
url :- localhost:3000/route/createUser
method :- post
data obj :- {"user_name":"ambuj_dubey","email":"ambujdubey89@gmail.com"}