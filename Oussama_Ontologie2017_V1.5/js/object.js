socket = io.connect(); 




var listOfObjects=[];
var ObjectDetail=[];
var urlCorese = "http://134.59.130.147"

 // fonction de récupération de toutes les objets
    function getAllObjects(){

          var url=urlCorese+"/tutorial/azkar?query=select ?x where { ?x  a <http://azkar.musee_Ontology.fr/amo%23MuseumObject> }";
          
          var data = {
               url: url,
               typeRequest: "getAllObjects"
           }  

          socket.emit('SparqlRequest',data);

          
        }


  // Le traitement de retours des résultats SPARQL envoyé par le serveur nodeJS à travers websocket
    socket.on('SparqlResult', function(data) {
            
            console.log("socket.on('SparqlResult',"+data.typeRequest+")")
            parser = new DOMParser();
            var xmlDoc = parser.parseFromString(data.result, "text/xml");
                
            // Convert XML to JSON
            var x2js = new X2JS();
            var jsonObj = x2js.xml2json(xmlDoc);
    if (data.typeRequest == 'getAllObjects') {
                 
                listOfObjects=jsonObj.sparql.results.result;
                
                  for(o in listOfObjects){
                      listOfObjects[o].binding.uri=listOfObjects[o].binding.uri.substring(listOfObjects[o].binding.uri.lastIndexOf("#")+1);
                      getDetailObject(listOfObjects[o].binding.uri);
                  }
                  
            }else if (data.typeRequest == 'getDetailObject'){
              ObjectDetail=jsonObj.sparql.results.result;
              var htmlTodisplay="";
              htmlTodisplay+="<table class='table table-striped table-bordered table-condensed'>";
              htmlTodisplay+="<tr><td><center><label>Attribue</label></center></td><td><center><label>Valeur</label></center></td></tr>"
             if(ObjectDetail != undefined){
            for( o in ObjectDetail){
              var attributeName = ObjectDetail[o].binding[0].uri;
              attributeName = attributeName.substring(attributeName.lastIndexOf("#")+1);
              if(attributeName != "type"){
                var value = ObjectDetail[o].binding[1].literal.__text;
                htmlTodisplay+="<tr><td><label>"+attributeName+"</label></td><td><label>"+value+"</label></td></tr>"
              }
            }
            htmlTodisplay+="</table>"
           
             $('#titre').append("<div class='panel panel-primary'><div class='panel-heading'><h4 class='panel-title'><a class='accordion-toggle' data-toggle='collapse' data-parent='#accordion' href='#"+data.ObjectName+"'><b>"+data.ObjectName+"</b></a></h4></div><div id='"+data.ObjectName+"' class='panel-collapse collapse'><div class='panel-body'>"+htmlTodisplay+"</div></div></div>")
            htmlTodisplay="";
          }
        }

          });


// fonction qui retourne le detail d'une objet passé en paramètre
function getDetailObject(ObjectName){

  if(ObjectName!=""){
    var url = urlCorese+"/tutorial/azkar?query=select ?y ?z where { <http://azkar.musee_Ontology.fr/schema%23"+ObjectName+"> ?y ?z}"
            
            var data = {
               url: url,
               typeRequest: "getDetailObject",
               ObjectName : ObjectName
            }  
            socket.emit('SparqlRequest',data);
  }
  
}