var Motherspace;    // Variabile che grabba l'elemento <svg>
var svgContent;     // Variabile che grabba il conenuto dell'elemento <svg>

var attributes;                     // Dizionario che contiene attributi del rect (x,y,width,height)
var coord_mousedown = undefined;    // Coordinate (x,y) del mousedown
var coord_mouseup = undefined;      // Coordinate (x,y) del mouseup

var down_onWorkspace = false; //Parametro di controllo per definire se il mousedown è avvenuto sul worksapce

//Al movimento del mouse, controllo se è il workspace è on
document.addEventListener("mousemove", isWorkspaceOn);


function isWorkspaceOn(){
    //Effettua la detection solo se siamo nello spazio workspace (se non siamo nell'indice)
    var myH3 = document.getElementsByTagName('h3')[0];
    if (myH3.innerHTML != "Ecco il tuo workspace!")
    {   if (myH3.innerHTML == "Ciao! Sei nell'indice") {console.log("Sei ancora nell'indice")}
        else {console.log("Qualcosa è andato storto!")}
        return false
    }
    Motherspace = document.getElementById('Motherspace'); //Il mio svg
    svgContent = Motherspace.innerHTML;

    //Determina le coordinate del punto in cui è avvenuto il mouseup e del mousedown
    var coord = clickDetector()
    //console.log("coord", coord);
    
    coord_mousedown = coord[0]
    coord_mouseup = coord[1]

    //Scrivo il rect all'interno dell'svg 
    if (coord_mousedown != undefined && coord_mouseup != undefined){
        //Funzione che calcola x,y, width e height e li restituisce a writeRect
        attributes = rectAttributes(coord_mousedown, coord_mouseup)
        writeRect(attributes)
        

        //Reset 
        coord_mousedown = undefined;
        coord_mouseup = undefined;
    }


}



function clickDetector(){
    //Ritorna coordinate di mouseupe mousedown
    document.addEventListener('mousedown', function(e){
        if (e.target === Motherspace)
        {   
            coord_mousedown = [e.clientX, e.clientY] 
            down_onWorkspace = true
        }
    
    if (down_onWorkspace)
    {
        document.addEventListener('mouseup', function(e){
            if (e.target !== Motherspace){
                down_onWorkspace = false;
                coord_mousedown = undefined;
                coord_mouseup = undefined;
            }
            else{
                //resetto il parametro down_onWorkspace
                coord_mouseup = [e.clientX, e.clientY] 
                //console.log(coord_mousedown, coord_mouseup)
            }
        });
    }
    });

    return [coord_mousedown, coord_mouseup]

}


function writeRect(attribute){
    var rectStyle = ' style= "fill:rgb(0,0,255);"'
    var rectToAdd = '\n<rect x=\"'  +attribute["x"]+  '\" y=\"' +attribute["y"]+  '" width="'+ attribute["width"] + '" height="'+ attribute["height"]+'"'+rectStyle+'>'
    
    console.log("rectToAdd",rectToAdd)

    // Scrive la tag <rect> e il suo contenuto all'interno del tag rect con id workspace
    //updateSvgContent = replaceLastOccurrence(inputString=svgContent, search="</rect>", replacement=rectToAdd)
    updateSvgContent = svgContent+rectToAdd
    updateSvgContent += "</rect>"

    console.log(updateSvgContent)

    Motherspace.innerHTML = updateSvgContent
}



function rectAttributes(coord_mousedown, coord_mousedown){

    var xDown = coord_mousedown[0]
    var yDown = coord_mousedown[1]
    var xUp =   coord_mousedown[0]
    var yUp =   coord_mousedown[1]

    var direction = [Math.sign(xDown-xUp), Math.sign(yDown-yUp)];

    var x;
    var y;
    var width = Math.abs(xDown-xUp);
    var height= Math.abs(yDown-yUp);

    //console.log("direction",direction)

    //  PROBLEM HERE
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

    //console.log("STUFF",x,y)

    attributes = {  "x": x, 
                    "y":y, 
                    "width":width, 
                    "height":height}
    
    var svgPosition = document.getElementsByTagName("svg")[0].getBoundingClientRect();
    //SOTTRAI ANCHE LA DIMENSIONE DEL BORDER DEL SVG
    var border_Motherspace = document.querySelector('#Motherspace').style.border
    var border_width = parseFloat(border_Motherspace)
    
    //console.log("border_width", border_width)
    attributes["x"] -= (svgPosition.x+border_width) 
    attributes["y"] -= (svgPosition.y+border_width) 

    
    return attributes
}



function replaceLastOccurrence(inputString, search, replacement) {
    const lastIndex = inputString.lastIndexOf(search);
  
    if (lastIndex === -1) {
        console.log("Pattern not found");
        return inputString;
    }
  
    const beforeLast = inputString.substring(0, lastIndex);
    const afterLast = inputString.substring(lastIndex + search.length);
  
    return beforeLast + replacement + afterLast;
  }

