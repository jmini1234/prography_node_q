var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

var client = mysql.createConnection({
   host : 'localhost',
   user : 'root',
   password : 'sjm1771033',
   database : 'Company'
});

var app = express();
app.use(bodyParser.urlencoded({
	extended:false
}));

app.listen(3000,function () {
	console.log('server running at http://127.0.0.1:3000');
});

app.get('/', function(request,response) { 
	fs.readFile('list.html','utf8', function(error,data){
		client.query('SELECT * FROM Products', function(error,results){
			response.send(ejs.render(data,{
				data:results
			}));
		});
	});
});


app.get('/delete/:id', function(request,response) {
      client.query('DELETE FROM Products WHERE id=?', [request.param('id')], function () {
      response.redirect('/');
    });
 });
app.get('/insert', function(request,response) { 
    fs.readFile('insert.html', 'utf8', function (error, data) {
    response.send(data);
    });
});
app.post('/insert', function(request,response) { 
    var body = request.body;
    client.query('INSERT INTO Products (name, modelnumber, series) VALUES (?, ?, ?)', [
        body.name, body.modelnumber, body.series
    ], function () {
        response.redirect('/');
    });
});

app.get('/edit/:id', function(request,response) { 
    fs.readFile('edit.html', 'utf8', function (error, data) {
        client.query('SELECT * FROM Products WHERE id = ?', [
            request.params.id
        ], function (error, result) {
            response.send(ejs.render(data, {
                data: result[0]
            }));
        });
    });
});




app.post('/edit/:id', function(request,response) {
    var body = request.body
    client.query('UPDATE Products SET name=?, modelnumber=?, series=? WHERE id=?', [
        body.name, body.modelnumber, body.series, request.params.id
    ], function () {
        response.redirect('/');
    });
 });
