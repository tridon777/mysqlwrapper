const express = require('express');
const sql = require('mysql2');
const serve = require('serve-static');
const parser = require('body-parser');
const mysql = require('mysql2');

const app = express();

let connection = mysql.createConnection({host:'localhost', user: 'root', password: '8547359p', database: 'TestCustomers'});
connection.query('SELECT * FROM Customers',function(err,results,fields){console.log(results)});
app.use(parser.urlencoded({extended: true}));
app.use(parser.json());

let port = 8181;

const router = express.Router();

let create = (input) => {
  console.log('made it');
    return connection.execute('INSERT INTO Customers VALUES ("",?,?,?,?,?)',[input.username,input.firstName,input.lastName,input.dateSignUp,input.password],(err,results,fields) => {
        console.log(results);
        if(err){
        	return 'failure';
        }
        else{return 'success';}
    });
}

router.get('/', (req,res)=>{
    res.json({message:'hello'});
});

router.post('/create',(req,res)=>{
    console.log(req.body,Array.from(req.body));
	res.send(create(req.body));
});

app.use('/api', router);

app.listen(port);
