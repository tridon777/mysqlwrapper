const express = require('express');
const sql = require('mysql2');
const serve = require('serve-static');
const parser = require('body-parser');
const mysql = require('mysql2');

const app = express();

let connection = mysql.createConnection({host:'localhost', user: 'root', database: 'TestCustomers'});

app.use(parser.urlencoded({extended: true}));
app.use(parser.json());

let port = 8181;

const router = express.Router();

router.get('/', (req,res)=>{
    res.json({message:'hello'});
});

app.use('/api', router);

app.listen(port);
