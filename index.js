
/////////////// Base Setup ///////////////////////////
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var PythonShell = require('python-shell');
var pyshell = new PythonShell('./testScripts/test.py');
var config = require('./config');
var mode = process.env.NODE_ENV;
var host;
var port;
if(mode === 'dev'){
	host = config.dev.host;
	port = config.dev.port;
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var apiRoutes = express.Router();


apiRoutes.use(function (req, res, next) {
  if(mode == 'dev'){
    console.log('Inisde the api routes middleware');
  }
  next();
});

apiRoutes.get('/callpython',function(req,res){
	if(mode == 'dev'){
		console.log("Inside the /callpython route");
	}

	// pyshell.send('hello')

	PythonShell.run('./testScripts/test.py',function(err,message){
		console.log("message from python",message);
		res.send(message)
	});

});



app.use('/api', apiRoutes);
app.listen(port,host);
console.log('Magic happens at '+ host +':'+ port);