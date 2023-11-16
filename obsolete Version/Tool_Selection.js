var hovShape;   //Hovered shape
var hovTagName;
var mousedown_coord = undefined; 

var offsetX;
var offsetY;

document.addEventListener("mousedown", function(e_down){
    //----------------------------------------------------------------
    //----------------------------------------------------------------
    //La funzione ritorna false, se siamo nell'indice
    var H3 = document.getElementsByTagName("H3")[0];
    if (H3.innerHTML != "Ecco il tuo workspace!"){
        console.log("Sei ancora nell'indice!")
        return 0;
    }
    //----------------------------------------------------------------
    //----------------------------------------------------------------
    //La funzione ritorna false, se il tool selezionato NON è valido o è vuoto
    var toolSelected = document.getElementById("toolSelected").innerHTML;
    TOOL = toolSelected.split(": ").pop()
    if (TOOL != "Selection Tool"){
        console.log("not selection tool")
        return false;
    }
    else{
    //----------------------------------------------------------------
    //----------------------------------------------------------------
    console.log("selection tool")
    clickDetector_2(e_down);

    }
    console.log("You selected")

});


function clickDetector_2(e){
    //Grabba le coordinate (x,y) in cui è avvenuto il mousedown

    if (e.target.tagName == "rect" || e.target.tagName == "ellipse")  
    {
        mousedown_coord = [e.clientX, e.clientY]; 
        hovShape = e.target
        hovTagName = e.target.tagName
    }   
    else
    { 
        return false;}

    console.log(mousedown_coord, hovShape, hovTagName)
    
    if (mousedown_coord != undefined){
        document.addEventListener('mouseup', function(e){
            var coord_mouseup = [e.clientX, e.clientY]; 
            offsetX = coord_mouseup[0] - mousedown_coord[0]
            offsetY = coord_mouseup[1] - mousedown_coord[1]
        
        if (hovTagName == "rect")
        {
            var x = parseFloat(hovShape.getAttribute("x"));
            var y = parseFloat(hovShape.getAttribute("y"));
            
            hovShape.setAttribute("x",x+offsetX);
            hovShape.setAttribute("y",y+offsetY);
        }

        else if (hovTagName == "ellipse")
        {
            var cx = parseFloat(hovShape.getAttribute("cx"));
            var cy = parseFloat(hovShape.getAttribute("cy"));

            hovShape.setAttribute("cx",cx+offsetX);
            hovShape.setAttribute("cy",cy+offsetY);
        }

        mousedown_coord = undefined;
        offsetX = 0;
        offsetY = 0;
        });
    }

};
