var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '54.180.98.142',
  user     : 'root',
  password : 'sjm1771033',
  database : 'Company'
});

connection.connect();

connection.query('SELECT * from Products', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.', err);
});

connection.end();
