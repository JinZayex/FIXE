var Motherspace;    // Variabile che grabba l'elemento <svg>
var svgContent;     // Variabile che grabba il conenuto dell'elemento <svg>

var attributes;                     // Dizionario che contiene attributi del rect (x,y,width,height)
var coord_mousedown = undefined;    // Coordinate (x,y) del mousedown
var coord_mouseup = undefined;      // Coordinate (x,y) del mouseup


// Dizionario con punto di ancoraggio e di rilascio
var rect_coord = {"coord_mousedown": coord_mousedown, "coord_mouseup": coord_mouseup};


document.addEventListener("mousemove", function(){
    var toolSelected = document.getElementById("toolSelected").innerHTML;

    if (toolSelected != "You selected the tool: Rect Tool"){
        console.log("NOT RECT")
        return 0;
    }

    //Definisco le variabili Motherspace e svgContent 
    Motherspace = document.getElementById('Motherspace'); 
    svgContent = Motherspace.innerHTML;                     

    console.log("You are moving")

    clickDetector() //Determina le coordinate del punto in cui è avvenuto il mouseup e del mousedown

    //Scrivo il rect all'interno dell'svg 
    if (rect_coord["coord_mousedown"] != undefined && rect_coord["coord_mouseup"] != undefined){
        attributes = rectAttributes(rect_coord) // Funzione che calcola x,y, width e height
        writeRect(attributes)                   // Scrivo il <rect> all'interno del html e, dunque, lo disegno

        //Reset 
        coord_mousedown = undefined; coord_mouseup = undefined;
        rect_coord = {"coord_mousedown": coord_mousedown, "coord_mouseup": coord_mouseup};
    }

});


function clickDetector(){
    var RECTS = document.getElementsByTagName('rect');
    //inserisci l'event target approvanoo anche i vari rect

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
    
    //Inserisce le coordinate di mousedown e mouseup al'interno di rect_coord
    rect_coord = {"coord_mousedown": coord_mousedown, "coord_mouseup": coord_mouseup};
    
    // Se il mousedown è undefined (è avvenuto fuori dal Motherspace) o non è avvenuto
    // Ed il mouseup è avvenuto all'interno del motherspace, dunque è stato salvato
    // Lo resetto
    if (rect_coord["coord_mousedown"] == undefined && rect_coord["coord_mouseup"] != undefined) 
        coord_mouseup = undefined;

    console.log("rect_coord",rect_coord)
    return rect_coord

}


function writeRect(attribute){
    var rectStyle = ' style= "fill:rgb(0,0,255);"'
    var rectToAdd = '\n<rect x=\"'  +attribute["x"]+  '\" y=\"' +attribute["y"]+  '" width="'+ attribute["width"] + '" height="'+ attribute["height"]+'"'+rectStyle+'></rect>'
    
    Motherspace.innerHTML += rectToAdd
}



function rectAttributes(rect_coord){
    var xDown = rect_coord["coord_mousedown"][0]
    var yDown = rect_coord["coord_mousedown"][1]
    var xUp =   rect_coord["coord_mouseup"][0]
    var yUp =   rect_coord["coord_mouseup"][1]

    
    // Lista di due numeri che indica la direzione dal punto A (ancoraggio) al punto R (rilascio)
    // Il punto di ancoraggio è in alto a sinistra
    // Se il primo   numero è positivo, ci siamo spostati da sx verso dx (e se è negativo ...)
    // Se il secondo numero è positivo, ci siamo spostati dall'alto verso il basso(e se è negativo ...)
    var direction = [Math.sign(xDown-xUp), Math.sign(yDown-yUp)];

    //Punti di ancoraggio (x,y) e dimensioni 
    var x;  
    var y;
    var width = Math.abs(xDown-xUp);
    var height= Math.abs(yDown-yUp);

    if ((direction[0] == 1) && (direction[1] == 1)){
        x = xUp;
        y = yUp;
    }
    else if ((direction[0] == -1) && (direction[1] == 1)){
        x = xDown;
        y = yUp;
    }
    else if ((direction[0] == -1) && (direction[1] == -1)){
        x = xDown;
        y = yDown;
    }
    else if ((direction[0] == 1) && (direction[1] == -1)){
        x = xUp;
        y = yDown;
    }

    attributes = {  "x": x, 
                    "y":y, 
                    "width":width, 
                    "height":height}
    
    // Aggiusto la posizione togliendo il punto di ancoraggio del svg e la dimensione del border del svg
    // Il primo valore è grabbato dalla funzione svgPosition (una lista che contiene anche altre informazioni)
    // Il secondo è all'interno di border_width
    var svgPosition = document.getElementsByTagName("svg")[0].getBoundingClientRect();
    var border_Motherspace = document.querySelector('#Motherspace').style.border
    var border_width = parseFloat(border_Motherspace)   //Prende da una stringa soltanto i valori numerici
    
    //console.log("border_width", border_width)
    attributes["x"] -= (svgPosition.x+border_width) 
    attributes["y"] -= (svgPosition.y+border_width) 

    
    return attributes
}

