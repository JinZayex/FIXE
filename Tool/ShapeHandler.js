var SVG = document.getElementsByTagName('svg')[0];;    // Variabile che grabba l'elemento <svg>
const reset_svg_x = SVG.getBoundingClientRect().x;
const reset_svg_y = SVG.getBoundingClientRect().y;


var attributes;                     // Dizionario che contiene attributi del rect (x,y,width,height)
var coord_mousedown = undefined;    // Coordinate (x,y) del mousedown
var coord_mouseup = undefined;      // Coordinate (x,y) del mouseup
var coord_mousemove = undefined;

var tempShape;

// Dizionario con punto di ancoraggio e di rilascio e di movimento
var mouse_event = { "coord_mousedown":  coord_mousedown, 
                    "coord_mouseup":    coord_mouseup, 
                    "coord_mousemove":  coord_mousemove};


document.addEventListener("mousemove", function(e_mousemove){
    //Continua con la funzione se il tool selezionato è uno degli shape (rect o ellipe)
    if (selectedTool != "tool-rect" && selectedTool != "tool-circle"){
        //console.log("Ne rect, ne ellipse")
        return false;
    }


    mouseMove(e_mousemove);    //Disegna le forme "temporanee" al mousemove
        
    clickDetector() //Determina le coordinate del punto in cui è avvenuto il mouseup e del mousedown


    //Se è avvenuto il mousedown e il mouseup scrivo la shape all'interno dell'svg 
    if (mouse_event["coord_mousedown"] != undefined && mouse_event["coord_mouseup"] != undefined){
        if (selectedTool == "tool-rect"){
            attributes = rectAttributes(mouse_event) // Funzione che calcola x,y, width e height
            writeRect(attributes)                    // Scrivo il <rect> all'interno del html e, dunque, lo disegno
        }

        else if (selectedTool == "tool-circle"){
            attributes = ellipseAttributes(mouse_event) // Funzione che calcola cx, cy, rx e ry
            writeEllipse(attributes)                    // Scrivo il <ellipse> all'interno del html e, dunque, lo disegno
        }

        //Reset 
        coord_mousedown = undefined; 
        coord_mouseup = undefined; 
        coord_mousemove = undefined;
        mouse_event = {"coord_mousedown": coord_mousedown, "coord_mouseup": coord_mouseup, "coord_mousemove": coord_mousemove};
        removePreviousTemp()
        
        updateContent('levels') // Richiama la funzione che modifica il content nello showbox "levels"
        return true
    }

});


function mouseMove(e){
    //Se non è avvenuto il mousedown, non "reagisco" all'evento mousemove
    //Esco dalla funzione
    if (mouse_event["coord_mousedown"] == undefined){
        return false;
    }

    //Grabbo la posizione corrente del mouse (mousemove)
    mouse_event["coord_mousemove"] = [e.clientX, e.clientY]

    //Settaggio dello style della shape temporanea
    var tempShapeStyle=' style= "fill:none; stroke:black; stroke-width:2px;"'
    
    //La variabile tempShape contiene la stringa da aggiungere nel mio svg 
    var tempShape = ''
    if (selectedTool == "tool-circle"){
        attributes = ellipseAttributes(mouse_event)
        var tempEllipse = '<ellipse cx=\"'  +attributes["cx"]+  '\" cy=\"' +attributes["cy"]+  '" rx="'+ attributes["rx"] + '" ry="'+ attributes["ry"]+'" id="temp" '+ tempShapeStyle+'></ellipse>'
        tempShape = tempEllipse
    }
    else if (selectedTool == "tool-rect"){
        attributes = rectAttributes(mouse_event)
        var tempRect = '<rect x=\"'  +attributes["x"]+  '\" y=\"' +attributes["y"]+  '" width="'+ attributes["width"] + '" height="'+ attributes["height"]+'" id="temp" '+tempShapeStyle+'></rect>'
        tempShape = tempRect
    }    

    removePreviousTemp()
    SVG.innerHTML += tempShape                          //Aggiungo il nuovo shape temporaneo

}


function clickDetector(){
    //Grabba le coordinate (x,y) in cui è avvenuto il mousedown
    document.addEventListener('mousedown', function(e){
        if (e.target === SVG || e.target.tagName === "rect" || e.target.tagName === "ellipse")
            coord_mousedown = [e.clientX, e.clientY]; 
    });
    
    //Grabba le coordinate (x,y) in cui è avvenuto il mouseup
    document.addEventListener('mouseup', function(e){
        if (e.target === SVG || e.target.tagName === "rect" || e.target.tagName === "ellipse")
            coord_mouseup = [e.clientX, e.clientY]; 
        else{
            coord_mousedown = undefined; 
            coord_mouseup = undefined;
        }

        //console.log("TARGET", e.target.tagName)
    });
    
    //Inserisce le coordinate di mousedown e mouseup al'interno di mouse_event
    mouse_event["coord_mousedown"] = coord_mousedown
    mouse_event["coord_mouseup"] = coord_mouseup
    
    // Se il mousedown è undefined (è avvenuto fuori dal Motherspace) o non è avvenuto
    // Ed il mouseup è avvenuto all'interno del motherspace, dunque è stato salvato
    // Lo resetto
    if (mouse_event["coord_mousedown"] == undefined && mouse_event["coord_mouseup"] != undefined) 
        coord_mouseup = undefined;

    //console.log("mouse_event",mouse_event)
    return mouse_event

}


function rectAttributes(mouse_event){
    /// ----------------------------------------------------------------
    //Coordinate (x,y) del mousedown
    var xDown = mouse_event["coord_mousedown"][0]
    var yDown = mouse_event["coord_mousedown"][1]

    //Prova a grabbare le coordinate (x,y) del mouseup
    try{
        var xUp = mouse_event["coord_mouseup"][0]
        var yUp = mouse_event["coord_mouseup"][1]
    }

        // Se mouse_coord["coord_mouseup"] == undefined, allora la funzione è stata chiamata
    // Dalla funzione temporanea mousemove, grabbiamo il nostro (x,y) del mousemove
    catch(err) {
        console.log("\nSta avvenendo il mousemove di un rect\n")
        var xUp = mouse_event["coord_mousemove"][0]
        var yUp = mouse_event["coord_mousemove"][1]
    }
    /// ----------------------------------------------------------------
    

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
    
    attributes["x"] -= reset_svg_x 
    attributes["y"] -= reset_svg_y 

    attributes["x"]      /= (scale)
    attributes["y"]      /= (scale)
    attributes["width"]  /= (scale)
    attributes["height"] /= (scale)


    attributes["x"]=     attributes["x"].toFixed(2)
    attributes["y"]=     attributes["y"].toFixed(2)
    attributes["width"]= attributes["width"].toFixed(2)
    attributes["height"]=attributes["height"].toFixed(2)



    return attributes
}

function ellipseAttributes(mouse_event){
    /// ----------------------------------------------------------------
    //Coordinate (x,y) del mousedown
    var xDown = mouse_event["coord_mousedown"][0]
    var yDown = mouse_event["coord_mousedown"][1]

    //Prova a grabbare le coordinate (x,y) del mouseup
    try{
        var xUp =   mouse_event["coord_mouseup"][0]
        var yUp =   mouse_event["coord_mouseup"][1]
    }
    
    // Se mouse_coord["coord_mouseup"] == undefined, allora la funzione è stata chiamata
    // Dalla funzione temporanea mousemove, grabbiamo il nostro (x,y) del mousemove
    catch(err) {
        console.log("\nSta avvenendo il mousemove di un ellipse\n")
        var xUp =   mouse_event["coord_mousemove"][0]
        var yUp =   mouse_event["coord_mousemove"][1]
    }
    /// ----------------------------------------------------------------
    
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
    
    attributes["cx"] -= reset_svg_x
    attributes["cy"] -= reset_svg_y


    attributes["cx"] /= (scale)
    attributes["cy"] /= (scale)
    attributes["rx"] /= (scale)
    attributes["ry"] /= (scale)

    attributes["cx"]= attributes["cx"].toFixed(2)
    attributes["cy"]= attributes["cy"].toFixed(2)
    attributes["rx"]= attributes["rx"].toFixed(2)
    attributes["ry"]= attributes["ry"].toFixed(2)
    
    return attributes
}


function writeRect(attributes,){
    var error = uncorrectValues(attributes, "rect")
    if (error){
        return false;
    }

    var rectStyle = ' style= "fill:rgb(0,0,255);"'
    var rectToAdd = '\n<rect x=\"'  +attributes["x"]+  '\" y=\"' +attributes["y"]+  '" width="'+ attributes["width"] + '" height="'+ attributes["height"]+'"'+rectStyle+'></rect>'
    
    SVG.innerHTML += rectToAdd
}

function writeEllipse(attributes){
    var error = uncorrectValues(attributes, "ellipse")
    if (error){
        console.log("Some of the attributes were NOT A NUMBER")
        return false;
    }

    var ellipseStyle = ' style= "fill:rgb(255,0,0);"'
    var ellipseToAdd = '\n<ellipse cx=\"'  +attributes["cx"]+  '\" cy=\"' +attributes["cy"]+  '" rx="'+ attributes["rx"] + '" ry="'+ attributes["ry"]+'"'+ellipseStyle+'></ellipse>'
    
    SVG.innerHTML += ellipseToAdd
}


function removePreviousTemp(){
    var previousTemp = SVG.getElementById("temp");      // Grabbo il precedente shape temporaneo (caratterizzato dall'id "temp")
    if (previousTemp)                                           // e, se esiste,
        previousTemp.remove();                                  // Lo rimuovo 
}



function uncorrectValues(attributes, shapeType){
    //Check if one of the values is NaN
    if (shapeType=="rect"){    
        if (isNaN(attributes["x"]) || isNaN(attributes["y"]) || isNaN(attributes["width"]) || isNaN(attributes["height"])){
            console.log("One of the attributes was NaN", attributes)
            return true;
        }
    }
    if (shapeType=="ellipse"){    
        if (isNaN(attributes["cx"]) || isNaN(attributes["cy"]) || isNaN(attributes["rx"]) || isNaN(attributes["ry"])){
            console.log("One of the attributes was NaN", attributes)
            return true;
        }
    }
    return false;
}


