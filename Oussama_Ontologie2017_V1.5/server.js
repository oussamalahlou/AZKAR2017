// Effacer la console à chaque lancement...
console.reset = function () {
  return process.stdout.write('\033c');
}

console.reset()

// ------------------------ Elements communs client/serveur
var tools = require('./js/common_tools'); // méthodes génériques


// HTTPS ---------------------------

var fs = require('fs');
var express = require('express');
var https = require('https');
var ent = require('ent'); // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)

pathKey = './ssl/hacksparrow-key.pem';
pathCert ='./ssl/hacksparrow-cert.pem';


key = fs.readFileSync(pathKey);
cert = fs.readFileSync(pathCert);


var https_options = {
	key: key,
	cert: cert
};


/*// Add proxy --------------------------
var hostProxy = process.env.PORT ? '0.0.0.0' : '127.0.0.1';
var portProxy = process.env.PORT || 443;
var cors_proxy = require('cors-anywhere');
var serverProxy = cors_proxy.createServer({
    httpsOptions : https_options,
    originWhitelist: [], // Allow all origins
    removeHeaders: ['cookie', 'cookie2']
});

var komcomProxy = require('./komcom-proxy.js')(serverProxy);

komcomProxy.listen(portProxy, hostProxy, function() {
    console.log('PROXY Running CORS Anywhere on ' + hostProxy + ':' + portProxy);
});

/**/// --------------------------------




//var PORT = '80';
var PORT = '443';
//var HOST = '127.0.0.1';
var HOST = '192.168.173.1';

app = express();

server = https.createServer(https_options, app).listen(PORT, HOST);
console.log('HTTPS Server listening on %s:%s', HOST, PORT);

// Pour que nodejs puisse servir correctement 
// les dépendances css du document html
app.use(express.static(__dirname));

// Routing des différentes IHM
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/ws-external_ressources.html');
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/ws-scene.html');
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/ws-trails.html');
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/ws-map-poi.html');
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/ws-object.html');
});


io = require('socket.io').listen(server); // OK


// Partie Web Sémantique -------------------------------------------------------

/*
var rdfstore = require('rdfstore');
var retourData = [];
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
/**/


// To Request SPARQL...
var request = require('request');



io.on('connection', function(socket, pseudo) {

	// Ecouteur de connexion entrante
	onSocketConnected(socket);

	// Reception d'une requete SPARQL
	socket.on('SparqlRequest', function(data) {
		
		console.log( "@ socket.on('Send request to corese server : ',"+data.typeRequest+")" )
		
		request(data.url, function (error, response, body) {
		  	console.log('error:', error); // Print the error if one occurred 
		  	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
		  	data.result=body;
		  	console.log( "> io.to(socket.id).emit('SparqlResult',"+data.typeRequest+")" )
		  	console.log(data.url)
		  	io.to(socket.id).emit('SparqlResult', data);
		
		});

	});

	/*socket.on('test', function(data) {
		
	});*/


});


// ------------ fonctions Diverses ------------

// Pour Contrôle des connectés coté serveur
// Ecouteur de connexion entrante
function onSocketConnected(socket) {
	console.log("> Connexion entrante: (ID: " + socket.id + ")");
}

