const express = require('express');
const sql = require('mysql2');
const serve = require('serve-static');
const parser = require('body-parser');
const mysql = require('mysql2');

const app = express();

let connection = mysql.createConnection({host:'localhost', user: 'root', password: 'yourPasswordHere', database: 'TestCustomers'});

app.use(parser.urlencoded({extended: true}));
app.use(parser.json());

let port = 8181;

const router = express.Router();

router.post('/create',(req,res)=>{
    let input = req.body;
    connection.query('INSERT INTO Customers VALUES ("",?,?,?,?,?)',[input.username,input.firstName,input.lastName,input.dateSignUp,input.password],(err,results) => {
      if(err){
        res.send('Database error');
      }
      else if(results.affectedRows > 0){
        res.send('success');
      }
      else{
      	res.send('Wrong username or password');
      }
    });
});

router.post('/login',(req,res)=>{
	connection.query('SELECT * FROM Customers WHERE username = ? AND password = ?',
                                   [req.body.username, req.body.password],
                                   (err,results) => { 
       if(err){
       	 res.send('Database error');
       }
       else if (results.length > 0){
         res.send(results);
       }
       else {
       		res.send('Wrong username or password');
       } 
     });
});

app.use('/profile', router);

app.listen(port);
