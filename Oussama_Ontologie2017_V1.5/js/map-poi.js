socket = io.connect(); 


// Voici les json correpondant aux maps et poi du datasets
// Attention, le "name" retourné par le robot est un path...
// Il faut extraire le nom du fichier image avec une regex, pas le chemin complêt...
// Et ne râles pas stp: Ce n'est pas moi qui ai codé ce que retourne le robot...


var Map1 = {"Name":"C:\\Maps\\labo261.png","Offset":{"X":-20.7969943946,"Y":-3.02713963867},
            "Width":1485,"Stride":1488,"Height":1187,"Resolution":0.019999999553};

var listPoisMap1 = [
  {"Id":0,"Name":"Start","Label":"Start","Pose":{"X":0,"Y":0,"T":0}},
  {"Id":1,"Name":"Pilier1","Label":"Pilier1","Pose":{"X":2.657378405937024,"Y":6.2462976540686714,"T":0}},
  {"Id":2,"Name":"Pilier2","Label":"Pilier2","Pose":{"X":2.4719096600822503,"Y":11.699078782199011,"T":0}},
  {"Id":3,"Name":"Est","Label":"Est","Pose":{"X":-3.3665679723240238,"Y":14.266605293166855,"T":-3.119}},
  {"Id":4,"Name":"Pilier3","Label":"Pilier3","Pose":{"X":-10.89460775413475,"Y":10.917516728817986,"T":0}},
  {"Id":5,"Name":"Pilier4","Label":"Pilier4","Pose":{"X":-10.124021004815544,"Y":5.938340810140021,"T":0}},
  {"Id":6,"Name":"Ouest","Label":"Ouest","Pose":{"X":-3.8404098830888453,"Y":3.2119936603855423,"T":-0.33411956812360338}}
];


var Map2 = {"Name":"C:\\Maps\\valerian3.png","Offset":{"X":-10.0026429165,"Y":-9.67300262729},
              "Width":1577,"Stride":1584,"Height":1577,"Resolution":0.019999999553};

var listPoisMap2 = [
  {"Id":0,"Name":"1_Start","Label":"Start","Pose":{"X":0,"Y":0,"T":0}},
  {"Id":1,"Name":"2_Entrée","Label":"Entrée","Pose":{"X":2.2366425481400523,"Y":3.8208672334191327,"T":0.415}},
  {"Id":2,"Name":"3_Univers","Label":"Univers","Pose":{"X":7.40450760117759,"Y":4.7484327557592021,"T":-1.52}},
  {"Id":3,"Name":"4_Civilisations","Label":"Civilisations","Pose":{"X":12.327421051402013,"Y":7.6396675126498863,"T":-0.37986656397884622}},
  {"Id":4,"Name":"5_Diversité","Label":"Diversité","Pose":{"X":12.7039813938932,"Y":14.028970283373626,"T":0.5191068077938954}},
  {"Id":5,"Name":"6_PolitiqueFiction","Label":"PolitiqueFiction","Pose":{"X":7.2040224556035417,"Y":16.827064742658582,"T":1.5928327922914307}},
  {"Id":6,"Name":"7_Inspirations","Label":"Inspirations","Pose":{"X":3.5437583861210982,"Y":13.040015625263182,"T":2.6812701522181888}},
  {"Id":7,"Name":"8_Gallerie","Label":"Gallerie","Pose":{"X":-0.41224895371263182,"Y":10.876432910249717,"T":2.357482765289407}},
  {"Id":8,"Name":"9_Auteurs","Label":"Auteurs","Pose":{"X":1.3194304490554116,"Y":7.515091839944076,"T":-1.00853705665336}}
];


var Map3 = {"Name":"C:\\Maps\\MAP_TEST.png","Offset":{"X":-10.0024429165,"Y":-9.67307262729},"Width":1577,"Stride":1584,"Height":1577,"Resolution":0.019999999553};

// les poi il faut les crée quoi que ce soit avec un linkedToMap qui porte le nom de la map+UUID
var listPoisMap3 = [
  {"Id":0,"Name":"1_POI_MAP_TEST","Label":"POI_MAP_TEST1","Pose":{"X":0,"Y":0,"T":0}},
  {"Id":1,"Name":"2_POI_MAP_TEST","Label":"POI_MAP_TEST2","Pose":{"X":2.2366425481400523,"Y":3.8208672334191327,"T":0.415}},
  {"Id":2,"Name":"3_POI_MAP_TEST","Label":"POI_MAP_TEST3","Pose":{"X":7.40450760117759,"Y":4.7484327557592021,"T":-1.52}},
  {"Id":3,"Name":"4_POI_MAP_TEST","Label":"POI_MAP_TEST4","Pose":{"X":12.327421051402013,"Y":7.6396675126498863,"T":-0.37986656397884622}},
  {"Id":4,"Name":"5_POI_MAP_TEST","Label":"POI_MAP_TEST5","Pose":{"X":12.7039813938932,"Y":14.028970283373626,"T":0.5191068077938954}},
  {"Id":5,"Name":"6_POI_MAP_TEST","Label":"POI_MAP_TEST6","Pose":{"X":7.2040224556035417,"Y":16.827064742658582,"T":1.5928327922914307}},
  {"Id":6,"Name":"7_POI_MAP_TEST","Label":"POI_MAP_TEST7","Pose":{"X":3.5437583861210982,"Y":13.040015625263182,"T":2.6812701522181888}},
  {"Id":7,"Name":"8_POI_MAP_TEST","Label":"POI_MAP_TEST8","Pose":{"X":-0.41224895371263182,"Y":10.876432910249717,"T":2.357482765289407}},
  {"Id":8,"Name":"9_POI_MAP_TEST","Label":"POI_MAP_TEST9","Pose":{"X":1.3194304490554116,"Y":7.515091839944076,"T":-1.00853705665336}}
];

var dataOfRobot=[];
var listOfMaps=[];
var listOfPOIs=[];
var POIDetail=[];
var MapsDetail=[];
var MapsToCreate=[];
var MapsToCheck=[];
var MAPComponent=[];
var urlCorese = "http://134.59.130.147"

 // fonction de récupération de toutes les MAPs
    function getAllMaps(){

          dataOfRobot.push({Map:Map1,POI:listPoisMap1},{Map:Map2,POI:listPoisMap2},{Map:Map3,POI:listPoisMap3})

          var url=urlCorese+"/tutorial/azkar?query=select ?x where { ?x  a <http://azkar.musee_Ontology.fr/amo%23MuseumMap> }";
          
          var data = {
               url: url,
               typeRequest: "getAllMaps"
           }  

          socket.emit('SparqlRequest',data);

          
        }


function VerifierEtCreerLesMapEtLesPOI(){
  for (mapRobot in dataOfRobot){
    var nameofMAP=dataOfRobot[mapRobot].Map.Name.substring(dataOfRobot[mapRobot].Map.Name.lastIndexOf("\\")+1)
    var POIsofMAP = dataOfRobot[mapRobot].POI
    nameofMAP=nameofMAP.substring(0,nameofMAP.lastIndexOf("."))
    var isMapNameExist=false;
    for(m in listOfMaps){
      if(listOfMaps[m].binding.uri === nameofMAP)
        isMapNameExist=true;
    }
    if(isMapNameExist){
      MAPToCheck(mapRobot,POIsofMAP)
      //MapsToCheck.push({MapName:nameofMAP})
    }
         
    else{
      MapToCreate(mapRobot,POIsofMAP)
      //MapsToCreate.push({MapName:nameofMAP}) 
    }
      
  }
}

function MAPToCheck(IndiceMap,POIsofMAP){
  
  var MapName=dataOfRobot[IndiceMap].Map.Name.substring(dataOfRobot[IndiceMap].Map.Name.lastIndexOf("\\")+1);
  MapName=MapName.substring(0,MapName.lastIndexOf("."));
  var NameFile=dataOfRobot[IndiceMap].Map.Name;
  var Offset_X=dataOfRobot[IndiceMap].Map.Offset.X;
  var Offset_Y=dataOfRobot[IndiceMap].Map.Offset.Y;
  var Width=dataOfRobot[IndiceMap].Map.Width;
  var Height=dataOfRobot[IndiceMap].Map.Height;
  var Resolution=dataOfRobot[IndiceMap].Map.Resolution;

  var urlCreateMAP=urlCorese+"/tutorial/azkar?query=INSERT DATA { <http://azkar.musee_Ontology.fr/schema%23"+MapName+"> a <http://azkar.musee_Ontology.fr/amo%23MuseumMap> ; <http://azkar.musee_Ontology.fr/amo%23hasDescription> 'undefined'; <http://azkar.musee_Ontology.fr/amo%23hasHeight> '"+Height+"'; <http://azkar.musee_Ontology.fr/amo%23hasMapParent> 'undefined' ; <http://azkar.musee_Ontology.fr/amo%23hasNameFile> '"+NameFile+"' ; <http://azkar.musee_Ontology.fr/amo%23hasOffsetX> '"+Offset_X+"' ; <http://azkar.musee_Ontology.fr/amo%23hasOffsetY> '"+Offset_Y+"' ; <http://azkar.musee_Ontology.fr/amo%23hasResolution> '"+Resolution+"' ; <http://azkar.musee_Ontology.fr/amo%23hasWidth> '"+Width+"' ; rdfs:label '"+MapName+"'}"
          console.log(urlCreateMAP)
          /*var data = {
               url: urlCreateMAP,
               typeRequest: "CreateNewMAP",
           }  

          socket.emit('SparqlRequest',data);*/
}

// fonction pour créer les MAP et les POI provenant du Robot
function MapToCreate(IndiceMap,POIsofMAP){
  var MapName=dataOfRobot[IndiceMap].Map.Name.substring(dataOfRobot[IndiceMap].Map.Name.lastIndexOf("\\")+1);
  MapName=MapName.substring(0,MapName.lastIndexOf("."));
  MapName+="_UID:"+CreateUID();
  var NameFile=dataOfRobot[IndiceMap].Map.Name;
  var Offset_X=dataOfRobot[IndiceMap].Map.Offset.X;
  var Offset_Y=dataOfRobot[IndiceMap].Map.Offset.Y;
  var Width=dataOfRobot[IndiceMap].Map.Width;
  var Height=dataOfRobot[IndiceMap].Map.Height;
  var Resolution=dataOfRobot[IndiceMap].Map.Resolution;

  var urlCreateMAP=urlCorese+"/tutorial/azkar?query=INSERT DATA { <http://azkar.musee_Ontology.fr/schema%23"+MapName+"> a <http://azkar.musee_Ontology.fr/amo%23MuseumMap> ; <http://azkar.musee_Ontology.fr/amo%23hasDescription> 'undefined'; <http://azkar.musee_Ontology.fr/amo%23hasHeight> '"+Height+"'; <http://azkar.musee_Ontology.fr/amo%23hasMapParent> 'undefined' ; <http://azkar.musee_Ontology.fr/amo%23hasNameFile> '"+NameFile+"' ; <http://azkar.musee_Ontology.fr/amo%23hasOffsetX> '"+Offset_X+"' ; <http://azkar.musee_Ontology.fr/amo%23hasOffsetY> '"+Offset_Y+"' ; <http://azkar.musee_Ontology.fr/amo%23hasResolution> '"+Resolution+"' ; <http://azkar.musee_Ontology.fr/amo%23hasWidth> '"+Width+"' ; rdfs:label '"+MapName+"'}"
          console.log(urlCreateMAP)
          /*var data = {
               url: urlCreateMAP,
               typeRequest: "CreateNewMAP",
           }  

          socket.emit('SparqlRequest',data);*/
  CreatePOIsMAP(POIsofMAP,MapName)
}

function CreatePOIsMAP(POIsofMAP,MAPNAME){
  for( p in POIsofMAP){
    var id = POIsofMAP[p].Id;
    var Name=POIsofMAP[p].Name;
    var Label=POIsofMAP[p].Label;
    var PoseX = POIsofMAP[p].Pose.X;
    var PoseY = POIsofMAP[p].Pose.Y;
    var PoseT = POIsofMAP[p].Pose.T;

     var urlCreatePOI=urlCorese+"/tutorial/azkar?query=INSERT DATA { <http://azkar.musee_Ontology.fr/schema%23"+Name+"> a <http://azkar.musee_Ontology.fr/amo%23MuseumPointOfInterest> ; <http://azkar.musee_Ontology.fr/amo%23hasDescription> '"+Label+"'; <http://azkar.musee_Ontology.fr/amo%23hasID> '"+id+"'; <http://azkar.musee_Ontology.fr/amo%23hasKeyWords> 'undefined' ; <http://azkar.musee_Ontology.fr/amo%23hasOrientation> '"+PoseT+"' ; <http://azkar.musee_Ontology.fr/amo%23hasXposition> '"+PoseX+"' ; <http://azkar.musee_Ontology.fr/amo%23hasYposition> '"+PoseY+"' ; <http://azkar.musee_Ontology.fr/amo%23hasUsualLanguage> 'undefined' ;<http://azkar.musee_Ontology.fr/amo%23linkedToMap> '"+MAPNAME+"' ; rdfs:label '"+Name+"'}"
          console.log(urlCreatePOI)
          /*var data = {
               url: urlCreatePOI,
               typeRequest: "CreatePOIsMAP",
           }  

          socket.emit('SparqlRequest',data);*/
  }

}
  // Le traitement de retours des résultats SPARQL envoyé par le serveur nodeJS à travers websocket
    socket.on('SparqlResult', function(data) {
            
            console.log("socket.on('SparqlResult',"+data.typeRequest+")")
            parser = new DOMParser();
            var xmlDoc = parser.parseFromString(data.result, "text/xml");
                
            // Convert XML to JSON
            var x2js = new X2JS();
            var jsonObj = x2js.xml2json(xmlDoc);
    if (data.typeRequest == 'getAllMaps') {
                 
                listOfMaps=jsonObj.sparql.results.result;
                
                  for(m in listOfMaps){
                      listOfMaps[m].binding.uri=listOfMaps[m].binding.uri.substring(listOfMaps[m].binding.uri.lastIndexOf("#")+1);
                      getDetailMAP(listOfMaps[m].binding.uri,m);
                  }
                  
                  VerifierEtCreerLesMapEtLesPOI();
            }else if (data.typeRequest == 'getPOIsOfMAP') {
                 
                listOfPOIs=jsonObj.sparql.results.result;
                $('#modalTitle').empty();
                $('#modalTitle').append("Les points d'intérêt relative à la MAP <b>"+data.MapName+"</b> : ");
                $('#modalBody').empty();
                $('#modalFooter').empty();
                $('#modalFooter').append("<button type='button' class='btn btn-primary active' data-dismiss='modal'>Fermer</button>");  
                  for(p in listOfPOIs){
                      listOfPOIs[p].binding.uri=listOfPOIs[p].binding.uri.substring(listOfPOIs[p].binding.uri.lastIndexOf("#")+1);
                      getDetailPOI(listOfPOIs[p].binding.uri);
                  }
            }else if (data.typeRequest == 'getMAPComponent'){
              MAPComponent=jsonObj.sparql.results.result;
              //console.log(MAPComponent);
              for (m in MAPComponent){
                var component = MAPComponent[m].binding.uri
                component=component.substring(component.lastIndexOf("#")+1)
                MAPComponent[m]=[];
                MAPComponent[m]=component;
              }
              confirmationSuppressionMAP(data.MAPIndice)
            }
            else if (data.typeRequest == 'getDetailMAP'){
              MapsDetail=jsonObj.sparql.results.result;
              var htmlTodisplay="";
              var btnInfoPOI="<button type='button' class='btn btn-info active' data-toggle='modal' data-target='#myModal' onclick='getPOIsOfMAP("+data.indice+");'><span class='glyphicon glyphicon-info-sign'></span> Afficher les points d'intérêt de "+data.MapName+"</button>";
              var btnDeleteMap="<button type='button' class='btn btn-danger active' data-toggle='modal' data-target='#myModal' onclick='deleteMAP("+data.indice+");'><span class='glyphicon glyphicon-remove'></span>Supprimer "+data.MapName+"</button>";
              htmlTodisplay+="</br><div align='left'>"+btnInfoPOI+" "+btnDeleteMap+"</div></br>";
              htmlTodisplay+="<table class='table table-striped table-bordered table-condensed'>";
              htmlTodisplay+="<tr><td><center><label>Attribue</label></center></td><td><center><label>Valeur</label></center></td></tr>"
             if(MapsDetail != undefined){
             for( m in MapsDetail){
              var attributeName = MapsDetail[m].binding[0].uri;
              attributeName = attributeName.substring(attributeName.lastIndexOf("#")+1);
              if(attributeName != "type"){
                var value = MapsDetail[m].binding[1].literal.__text;
                htmlTodisplay+="<tr><td><label>"+attributeName+"</label></td><td><label>"+value+"</label></td></tr>"
              }
            }
            htmlTodisplay+="</table>"
           
             $('#titre').append("<div class='panel panel-primary'><div class='panel-heading'><h4 class='panel-title'><a class='accordion-toggle' data-toggle='collapse' data-parent='#accordion' href='#"+data.MapName+"'><b>"+data.MapName+"</b></a></h4></div><div id='"+data.MapName+"' class='panel-collapse collapse'><div class='panel-body'>"+htmlTodisplay+"</div></div></div>")
            htmlTodisplay="";
          }
        }else if (data.typeRequest == 'getDetailPOI'){
              POIDetail=jsonObj.sparql.results.result;  
              htmlTodisplay="<table class='table table-striped table-bordered table-condensed'>";
              htmlTodisplay+="<tr><td><center><label>Attribue</label></center></td><td><center><label>Valeur</label></center></td></tr>"
             if(POIDetail != undefined){
             for( p in POIDetail){
              var attributeName = POIDetail[p].binding[0].uri;
              attributeName = attributeName.substring(attributeName.lastIndexOf("#")+1);
              if(attributeName != "type"){
                var value = POIDetail[p].binding[1].literal.__text;
                htmlTodisplay+="<tr><td><label>"+attributeName+"</label></td><td><label>"+value+"</label></td></tr>"
              }
            }
            htmlTodisplay+="</table>"
           
            $('#modalBody').append("<div class='panel panel-success'><div class='panel-heading'><h4 class='panel-title'><a class='accordion-toggle' data-toggle='collapse' data-parent='#accordion' href='#"+data.POIName+"'><b>"+data.POIName+"</b></a></h4></div><div id='"+data.POIName+"' class='panel-collapse collapse'><div class='panel-body'>"+htmlTodisplay+"</div></div></div>")
            htmlTodisplay="";
          }
        }
         
          });


// fonction qui retourne les  points d'intérêt liés à une MAP donnée.
function getPOIsOfMAP(indice){
  var MapName=listOfMaps[indice].binding.uri

  var urlPOIofMAP=urlCorese+"/tutorial/azkar?query=select ?x where { ?x  a <http://azkar.musee_Ontology.fr/amo%23MuseumPointOfInterest> . ?x <http://azkar.musee_Ontology.fr/amo%23linkedToMap> '"+MapName+"'}";
          console.log(urlPOIofMAP)
          var data = {
               url: urlPOIofMAP,
               typeRequest: "getPOIsOfMAP",
               MapName : MapName
           }  

          socket.emit('SparqlRequest',data);
}

// fonction qui retourne le detail d'un point d'intérêt passé en paramètre
function getDetailPOI(POIName){

  if(POIName!=""){
    var url = urlCorese+"/tutorial/azkar?query=select ?y ?z where { <http://azkar.musee_Ontology.fr/schema%23"+POIName+"> ?y ?z}"
            
            var data = {
               url: url,
               typeRequest: "getDetailPOI",
               POIName : POIName
            }  
            socket.emit('SparqlRequest',data);
  }
  
}

// pop-up de suppression d'une map avec ces objets associé 
function deleteMAP(indice){
  var MapName=listOfMaps[indice].binding.uri
  $('#modalTitle').empty();
  $('#modalTitle').append('<h4><b>Suppression de la MAP  : '+MapName+'</b></h4>');
  $('#modalBody').empty();
  $('#modalBody').append('<h4>Êtes vous sûr de vouloir supprimer cette MAP (même les objets liés à cette MAP vont êtres supprimer) ?</h4>');
  $('#modalFooter').empty();
  $('#modalFooter').append("<button type='button' class='btn btn-danger active' data-dismiss='modal' onclick='getMAPComponent("+indice+")'><span class='glyphicon glyphicon-remove'></span> Supprimer</button>");
  $('#modalFooter').append("<button type='button' class='btn btn-default active' data-dismiss='modal'>Annuler</button>");
}

// Charger les composants de la MAP
function getMAPComponent(indice){
  var MapName=listOfMaps[indice].binding.uri

  var urlMAPComponent=urlCorese+"/tutorial/azkar?query=select ?x where { ?x <http://azkar.musee_Ontology.fr/amo%23linkedToMap> '"+MapName+"'}";
          console.log(urlMAPComponent)
          var data = {
               url: urlMAPComponent,
               typeRequest: "getMAPComponent",
               MAPIndice : indice
           }  

          socket.emit('SparqlRequest',data);

}


// confirmation de suppression de la MAP avec ces composants
function confirmationSuppressionMAP(indice){
  var MapName=listOfMaps[indice].binding.uri

  for (c in MAPComponent){
    var urlDelete = urlCorese+"/tutorial/azkar?query=DELETE {<http://azkar.musee_Ontology.fr/schema%23"+MAPComponent[c]+"> ?y ?z} where { ?x ?y ?z }"
     console.log("urlDelete : "+urlDelete);
     /*var data = {
                url: urlDelete,
                typeRequest: "confirmationSuppressionMAP"
              }
              socket.emit('SparqlRequest',data);*/
  }
  //suppression de la MAP
  var urlDelete= urlCorese+"/tutorial/azkar?query=DELETE { <http://azkar.musee_Ontology.fr/schema%23"+MapName+">  ?y ?z } where { ?x ?y ?z }"
        console.log("urlDelete : "+urlDelete);
        /*var data = {
                url: urlDelete,
                typeRequest: "confirmationSuppressionMAP"
              }
              socket.emit('SparqlRequest',data);*/

}
// fonction qui retourne le detail d'une map passé en paramètre
function getDetailMAP(MapName,indice){

  if(MapName!=""){
    var url = urlCorese+"/tutorial/azkar?query=select ?y ?z where { <http://azkar.musee_Ontology.fr/schema%23"+MapName+"> ?y ?z}"
            
            var data = {
               url: url,
               typeRequest: "getDetailMAP",
               MapName : MapName,
               indice : indice
            }  
            socket.emit('SparqlRequest',data);
  }
  
}

// fonction de génération des UID unique
function CreateUID(){
  return tools.createUUID();
}