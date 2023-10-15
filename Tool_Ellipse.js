var Motherspace;    // Variabile che grabba l'elemento <svg>
var svgContent;     // Variabile che grabba il conenuto dell'elemento <svg>

var attributes;                     // Dizionario che contiene attributi del rect (x,y,width,height)
var coord_mousedown = undefined;    // Coordinate (x,y) del mousedown
var coord_mouseup = undefined;      // Coordinate (x,y) del mouseup


// Dizionario con punto di ancoraggio e di rilascio
var ellipse_coord = {"coord_mousedown": coord_mousedown, "coord_mouseup": coord_mouseup};


document.addEventListener("mousemove", function(){
    var toolSelected = document.getElementById("toolSelected").innerHTML;
    
    if (toolSelected != "You selected the tool: Ellipse Tool"){
        console.log("NOT ELLIPSE")
        return 0;
    }

    console.log("Ellipse tool")

    //Definisco le variabili Motherspace e svgContent 
    Motherspace = document.getElementById('Motherspace'); 
    svgContent = Motherspace.innerHTML;                     
        
    clickDetector() //Determina le coordinate del punto in cui è avvenuto il mouseup e del mousedown

    //Scrivo il rect all'interno dell'svg 
    if (ellipse_coord["coord_mousedown"] != undefined && ellipse_coord["coord_mouseup"] != undefined){
        attributes = ellipseAttributes(ellipse_coord) // Funzione che calcola x,y, width e height
        writeEllipse(attributes)                   // Scrivo il <rect> all'interno del html e, dunque, lo disegno

        //Reset 
        coord_mousedown = undefined; coord_mouseup = undefined;
        ellipse_coord = {"coord_mousedown": coord_mousedown, "coord_mouseup": coord_mouseup};
    }

});


function clickDetector(){
    var ELLIPSE = document.getElementsByTagName('ellipse');
    //inserisci l'event target approvanoo anche i vari ellipse

    //Grabba le coordinate (x,y) in cui è avvenuto il mousedown
    document.addEventListener('mousedown', function(e){
        if (e.target === Motherspace)
            coord_mousedown = [e.clientX, e.clientY]; 
    });
    
    //Grabba le coordinate (x,y) in cui è avvenuto il mouseup
    document.addEventListener('mouseup', function(e){
        if (e.target === Motherspace)
            coord_mouseup = [e.clientX, e.clientY]; 
        else{
            coord_mousedown = undefined; 
            coord_mouseup = undefined;
        }
        console.log("TARGET",e.target)
    });
    
    //Inserisce le coordinate di mousedown e mouseup al'interno di ellipse_coord
    ellipse_coord = {"coord_mousedown": coord_mousedown, "coord_mouseup": coord_mouseup};
    
    // Se il mousedown è undefined (è avvenuto fuori dal Motherspace) o non è avvenuto
    // Ed il mouseup è avvenuto all'interno del motherspace, dunque è stato salvato
    // Lo resetto
    if (ellipse_coord["coord_mousedown"] == undefined && ellipse_coord["coord_mouseup"] != undefined) 
        coord_mouseup = undefined;

    console.log("ellipse_coord",ellipse_coord)
    return ellipse_coord

}


function ellipseAttributes(ellipse_coord){
    var xDown = ellipse_coord["coord_mousedown"][0]
    var yDown = ellipse_coord["coord_mousedown"][1]
    var xUp =   ellipse_coord["coord_mouseup"][0]
    var yUp =   ellipse_coord["coord_mouseup"][1]

    
    // Lista di due numeri che indica la direzione dal punto A (ancoraggio) al punto R (rilascio)
    // Il punto di ancoraggio è in alto a sinistra
    // Se il primo   numero è positivo, ci siamo spostati da sx verso dx (e se è negativo ...)
    // Se il secondo numero è positivo, ci siamo spostati dall'alto verso il basso(e se è negativo ...)
    var direction = [Math.sign(xDown-xUp), Math.sign(yDown-yUp)];

    //Punti di ancoraggio (x,y) e dimensioni 
    var cx;  
    var cy;
    var rx = Math.abs(xDown-xUp) /2;
    var ry= Math.abs(yDown-yUp)  /2;

    if ((direction[0] == 1) && (direction[1] == 1)){
        cx = xUp+rx;
        cy = yUp+ry;
    }
    else if ((direction[0] == -1) && (direction[1] == 1)){
        cx = xDown+rx;
        cy = yUp+ry;
    }
    else if ((direction[0] == -1) && (direction[1] == -1)){
        cx = xDown+rx;
        cy = yDown+ry;
    }
    else if ((direction[0] == 1) && (direction[1] == -1)){
        cx = xUp+rx;
        cy = yDown+ry;
    }

    attributes = {  "cx": cx, 
                    "cy": cy, 
                    "rx":rx, 
                    "ry":ry}
    
    // Aggiusto la posizione togliendo il punto di ancoraggio del svg e la dimensione del border del svg
    // Il primo valore è grabbato dalla funzione svgPosition (una lista che contiene anche altre informazioni)
    // Il secondo è all'interno di border_width
    var svgPosition = document.getElementsByTagName("svg")[0].getBoundingClientRect();
    var border_Motherspace = document.querySelector('#Motherspace').style.border
    var border_width = parseFloat(border_Motherspace)   //Prende da una stringa soltanto i valori numerici
    
    //console.log("border_width", border_width)
    attributes["cx"] -= (svgPosition.x+border_width) 
    attributes["cy"] -= (svgPosition.y+border_width) 

    
    return attributes
}

function writeEllipse(attribute){
    var ellipseStyle = ' style= "fill:rgb(255,0,0);"'
    var ellipseToAdd = '\n<ellipse cx=\"'  +attribute["cx"]+  '\" cy=\"' +attribute["cy"]+  '" rx="'+ attribute["rx"] + '" ry="'+ attribute["ry"]+'"'+ellipseStyle+'></ellipse>'
    
    Motherspace.innerHTML += ellipseToAdd
}