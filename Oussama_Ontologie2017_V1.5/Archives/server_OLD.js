// Effacer la console à chaque lancement...
console.reset = function () {
  return process.stdout.write('\033c');
}

console.reset()

var ontology = "";
//var getAction="";

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

//var PORT = '80';
var PORT = '443';
//var HOST = 'localhost';
var HOST = '192.168.173.1';
app = express();

server = https.createServer(https_options, app).listen(PORT, HOST);
console.log('HTTPS Server listening on %s:%s', HOST, PORT);

// Pour que nodejs puisse servir correctement 
// les dépendances css du document html
app.use(express.static(__dirname));

// Routing des différentes IHM
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/ws-media.html');
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/ws-scene.html');
});


io = require('socket.io').listen(server); // OK


// Partie Web Sémantique -------------------------------------------------------

var rdfstore = require('rdfstore');
var retourData = [];
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;




io.on('connection', function(socket, pseudo) {

  // Ecouteur de connexion entrante
    onSocketConnected(socket);

    
    // réception d'une messagre Websocket (Demande de ressources sur une scene)
    socket.on('getSceneRessources',function(data) {
      
      //getAction=action.toString();
      console.log("socket On >>> getSceneRessources")
      // console.log(data);
      
    // Récupération distante du dataset de l'ontologie 
    //getFileFromServer("http://localhost:80/sparql/dataset.ttl", function(text) {
    /*getFileFromServer("http://localhost/oussama_ontologie2017/dataSet.ttl", function(text) {


        if (text === null) {
            console.log('An error occurred');
        } else {
            
            ontology = text.toString();
            //console.log(ontology)
            //persistConfig(ontology,"dataSet.ttl");
        
            rdfstore.create(function(err, store) {    
              if (err) console.log("There was an error creating the store", err);                    
              else  {
              
                  var syncPath = __dirname + "/files/dataSet.ttl";      //local but not enough 
                  var re = new RegExp('/', 'g');
                  syncPath = syncPath.replace(re, '\\'); //update path        
                      //LOCAL
                    store.load("text/turtle" , ontology, function(err, results) {           
                          //var query = 'SELECT * WHERE { ?s ?p ?o } LIMIT 1'
                          //var query = 'SELECT * WHERE { <http://azkar.musee_Ontology.fr/schema#Marne14> ?p ?o } LIMIT 10'


                         
                          /*var queryInsert= 'INSERT DATA{ <http://azkar.musee_Ontology.fr/schema#dbpediaMarne14> <http://azkar.musee_Ontology.fr/amo#hasMetric> "MetricTest"}'
                           //where {<http://azkar.musee_Ontology.fr/schema#dbpediaMarne14> <http://azkar.musee_Ontology.fr/amo#hasMetric> "" }
                          
                          //store.insert(queryInsert, function(){});

                          store.execute(queryInsert, function(err, results){
                            //console.log(JSON.stringify(result));
                            //store.registerDefaultProfileNamespaces();
                            //store.execute('SELECT * { ?s <http://azkar.musee_Ontology.fr/amo#hasMetric> ?name }', function(success,results) {
                            store.registerDefaultProfileNamespaces();

                         
                            });*/



                          //});
                         /* var queryInsert = 'SELECT * WHERE { <http://azkar.musee_Ontology.fr/schema#dbpediaMarne14> <http://azkar.musee_Ontology.fr/amo#hasMetric> ?x }'
                           store.execute(queryInsert, function(err, results){
                            store.registerDefaultProfileNamespaces();
                            //persistConfig(JSON.stringify(results),"results.ttl");
                            //persistConfig(store,"store.ttl");
                            //console.log(JSON.stringify(results));
                            //persistConfig(JSON.stringify(results),"dataSet.ttl");
                          });*/


                           /*Delete Triple*/
                           /*var queryDelete= 'DELETE DATA { <http://azkar.musee_Ontology.fr/schema#wikipediaMarne14> <http://azkar.musee_Ontology.fr/amo#isDescribe> "Historical"}'
                           //where {<http://azkar.musee_Ontology.fr/schema#dbpediaMarne14> <http://azkar.musee_Ontology.fr/amo#hasMetric> "" }
              
                          store.execute(queryDelete, function(){
                            //console.log(JSON.stringify(result));
                            //store.registerDefaultProfileNamespaces();
                            //store.execute('SELECT * { ?s <http://azkar.musee_Ontology.fr/amo#hasMetric> ?name }', function(success,results) {
                            store.registerDefaultProfileNamespaces();
                         
                            });*/
                          //});
                          /*var queryDelete = 'SELECT ?x WHERE { <http://azkar.musee_Ontology.fr/schema#dbpediaMarne14> <http://azkar.musee_Ontology.fr/amo#hasMetric> ?x }'
                           store.execute(queryDelete, function(err, results){
                            store.registerDefaultProfileNamespaces();
                            console.log(JSON.stringify(results));
                          });*/
                           /**/
                           /*rdfstore.connect("http://localhost/oussama_ontologie2017/dataSet.ttl", function(err,store){
                             if(err) console.log("Erreur : "+err);
                             console.log("###########################################");
                             console.log(store);
                             console.log("###########################################");
                           });*/
                            /*var queryDelete= 'DELETE DATA { <http://azkar.musee_Ontology.fr/amo#externalMedia> <http://azkar.musee_Ontology.fr/amo#hasURI> "https://www.youtube.com/embed/iCMYIsdWeyM"}'
                           //where {<http://azkar.musee_Ontology.fr/schema#dbpediaMarne14> <http://azkar.musee_Ontology.fr/amo#hasMetric> "" }
              
                            store.execute(queryDelete, function(){
                            //console.log(JSON.stringify(result));
                            //store.registerDefaultProfileNamespaces();
                            //store.execute('SELECT * { ?s <http://azkar.musee_Ontology.fr/amo#hasMetric> ?name }', function(success,results) {
                            store.registerDefaultProfileNamespaces();
                         
                            });*/
                          //if(getAction=="select"){
                         /*   var query = 'SELECT * WHERE { <http://azkar.musee_Ontology.fr/schema#'+data.object+'> ?p ?o }'
                         //var query='http://corese.inria.fr/tutorial/azkar?query=select*where{?a ?b ?c}'
                          //SELECT * WHERE { <http://azkar.musee_Ontology.fr/schema#La_tranchee> ?p ?o }'
                          store.execute(query, function(err, results){
                              //console.log(JSON.stringify(results));
                              var dataArray = results;
                                  for (data in dataArray) {
                                     
                                      var u = dataArray[data].p.value;
                                      if(u.substring(0,11) == "http://purl"){
                                          var n = u.substr(u.lastIndexOf('/') + 1)
                                      } else {
                                          var n = u.substr(u.lastIndexOf('#') + 1)
                                      }
                                      var q = dataArray[data].o.value;
                                      retourData.push({propriete:n,valeur:q});
                                  }
                                  //console.log(JSON.stringify(retourData));
                                  //store.load("remote" , retourData,function(err, results) {});

                                  socket.emit('onSceneRessources', {sentData: retourData});

                                  

                                  // socket.broadcast.emit('nouveauClientOut', data); // Envoie a tout le mode sauf au connecté éméteur...
                    // io.to(socket.id).emit('nouveauClientOut', data); // Envoie a uconnecté précis...
                              }); 
                            retourData = [];
                         // }

                           
                          
                                               
                      }); //END LOCAL
                  
                  store.close(); 
              } // End if (err) else {
          }); // End rdfstore.create(function(err, store) { 
        } // End if result
    });*/ // End getFileFromServer(...
    }); // End socket.on('getSceneRessources'..

socket.on('updateSceneRessources', function(data,propertieNameOfMediaValue) {
   if (data === null || propertieNameOfMediaValue=== null ) {
            console.log('An error occurred');
        } else {
          var arr=propertieNameOfMediaValue.split(":");
          console.log("-----------------------------------------------------------");
          console.log("propertieNameOfMediaValue = "+arr[0]+":"+arr[1]);
          for(c in data)
          console.log(data[c].Propriete +"||"+data[c].newValue);
          console.log("-----------------------------------------------------------");


          var myOntology=ontology.split(". ");
          for(d in myOntology){
            //console.log("--------------------------------------------------");
            //console.log(myOntology[d]);
            var onto="";
            if(myOntology[d].includes("rdf:type <http://azkar.musee_Ontology.fr/amo#externalMedia> ;") && myOntology[d].includes("amo:"+arr[1])){
              //var v=myOntology[d].substr(myOntology[d].indexOf(";")+1);
              var o=myOntology[d].split(";");
               onto="\namo:"+arr[1]+"\n";
                onto+="   rdf:type <http://azkar.musee_Ontology.fr/amo#externalMedia> ;\n"
               for(c in data){
               var type="";  
                for(on in o){
                  if(o[on].includes(data[c].Propriete))
                    type=o[on].substr(o[on].lastIndexOf('^^') + 2);
                }
                if(type==="" || data[c].Propriete==="linkedToScene"){
                  data[c].newValue="amo:"+data[c].newValue.substr(data[c].newValue.lastIndexOf("#")+1);
                  onto+="   <http://azkar.musee_Ontology.fr/amo#"+data[c].Propriete+"> "+data[c].newValue+";"
                }
                
                else{
                  
                onto+="   <http://azkar.musee_Ontology.fr/amo#"+data[c].Propriete+"> \""+data[c].newValue+"\"^^"+type+";"
                }
                if(c!=data.length)
                  onto+="\n";
               }
               console.log("-------------------------------------------------------")
               console.log(onto);
               console.log("-------------------------------------------------------")
               //myOntology[d]="";
               myOntology[d]=onto;
              //console.log(v);
              
              //console.log("--------------------------------------------------");
            }
          }
          for(d in myOntology){
            myOntology[d]+=". ";

            console.log(myOntology[d]);
          }

       persistConfig(myOntology.toString,"store.ttl");
rdfstore.create(function(err, store) {    
              if (err) console.log("There was an error creating the store", err);                    
              else  {
              
                  /*var syncPath = __dirname + "/files/dataset.ttl";      //local but not enough 
                  var re = new RegExp('/', 'g');
                  syncPath = syncPath.replace(re, '\\'); //update path    */    
                      //LOCAL
                    store.load("text/turtle" , ontology, function(err, results) {
          var query = 'DELETE DATA  { <http://azkar.musee_Ontology.fr/schema#'+arr[1]+'> ?p ?o }';
         // var query = 'DELETE DATA{ <http://azkar.musee_Ontology.fr/schema#pictureOfLatranchee> <http://azkar.musee_Ontology.fr/amo#hasExtMediaName> ?x }';
          //INSERT { <http://azkar.musee_Ontology.fr/schema#pictureOfLatranchee> <http://azkar.musee_Ontology.fr/amo#hasExtMediaName> "oussama" } WHERE  {<http://azkar.musee_Ontology.fr/schema#pictureOfLatranchee> <http://azkar.musee_Ontology.fr/amo#hasExtMediaName> "pictureOfLatranchee" }';
                           store.execute(query, function(err, results){
                            store.registerDefaultProfileNamespaces();

                            //persistConfig(store,"store.ttl");
                            //console.log(JSON.stringify(results));
                            //persistConfig(JSON.stringify(results),"dataSet.ttl");
                          });

                           /*var query = 'INSERT DATA{ <http://azkar.musee_Ontology.fr/schema#pictureOfLatranchee> <http://azkar.musee_Ontology.fr/amo#hasExtMediaName> ?x }';
          //INSERT { <http://azkar.musee_Ontology.fr/schema#pictureOfLatranchee> <http://azkar.musee_Ontology.fr/amo#hasExtMediaName> "oussama" } WHERE  {<http://azkar.musee_Ontology.fr/schema#pictureOfLatranchee> <http://azkar.musee_Ontology.fr/amo#hasExtMediaName> "pictureOfLatranchee" }';
                           store.execute(query, function(err, results){
                            store.registerDefaultProfileNamespaces();
                            //persistConfig(store,"store.ttl");
                            //console.log(JSON.stringify(results));
                            //persistConfig(JSON.stringify(results),"dataSet.ttl");
                          });*/
                           var query = 'SELECT * WHERE { ?s ?p ?o }'
                          // var query ='SELECT * WHERE { ?x ?y ?z}';
                           store.execute(query, function(err, results){
                            //console.log(JSON.stringify(results));
                            store.registerDefaultProfileNamespaces();
                            //persistConfig(JSON.stringify(results),"results.ttl");
                            /*store.registeredGraphs(function(success,arrayGraph){
                              if(success)
                                persistConfig("arrayGraph","resultatFin.ttl");
                              else
                                console.log("ERROR !!!");

                            });*/
                           /* store.registerDefaultProfileNamespaces();

                            var dataArray = results;
                            var DataToStore = [];
                                  for (data in dataArray) {
                                     
                                     var s=dataArray[data].s.value.toString();
                                      var u = dataArray[data].p.value.toString();
                                     
                                      var q = dataArray[data].o.value.toString();
                                      DataToStore.push({subject:s,propriete:u,valeur:q});
                                  }*/
                            
                            //persistConfig(results.toString(),"res.ttl");
                            //persistConfig(ontology,"oussama.ttl");
                            //console.log(JSON.stringify(results));
                            //persistConfig(JSON.stringify(results),"dataSet.ttl");
                          });//
});//
          //ontology=ontology.replace(/ /g,"");
          /*var arr=ontology.split(". ");
           for(c in arr){
            console.log("--------------------------------------");
            console.log(arr[c]);
            console.log("--------------------------------------");
           }*/
           
          
        }
});
}
});

socket.on('deleteSceneRessources', function(data) {

});

socket.on('addSceneRessources', function(data) {

});

});


function getFileFromServer(url, doneCallback) {
    
  console.log("@ getFileFromServer")

    var xhr;

    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = handleStateChange;
    xhr.open("GET", url, true);
    xhr.send();

    function handleStateChange() {
        if (xhr.readyState === 4) {
            doneCallback(xhr.status == 200 ? xhr.responseText : null);
        }
    }

}

function persistConfig(data,fileName) {
    //newData = JSON.stringify(data);
    //fs.writeFile(fileName, newData , "utf8", function (err) {
      fs.writeFile(fileName, data , "utf8", function (err) {
        if (err) return console.log(err);
    });
}





// ------------ fonctions Diverses ------------

// Pour Contrôle des connectés coté serveur
// Ecouteur de connexion entrante
function onSocketConnected(socket) {
    console.log("> Connexion entrante: (ID: " + socket.id + ")");
}

