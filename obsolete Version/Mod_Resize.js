var TRANSFORM = 1.0;
var left = 0;
document.addEventListener("keypress", function(e){
    // Select all <svg> elements
    var code = e.code;
    if (code == "BracketRight"){
        console.log("resize boy")
        TRANSFORM += 0.1    
    }
    else if (code == "Slash"){
        console.log("upresize boy")
        TRANSFORM -= 0.1
    }

    resize(TRANSFORM)    

});


function resize(TRANSFORM){
    var svgElement = document.getElementsByTagName('svg')[0];    //Grabba l'elemento svg
    var styleAttribute = svgElement.getAttribute('style');       //Grabba lo style dell'elemento svg
    
    //Grabbo i valori top e left
    //var top = svgElement.getBoundingClientRect().top
    //var left = svgElement.getBoundingClientRect().left
    
    console.log("1", top, left, typeof top)
    var firstStylePart= styleAttribute.split("transform: ")[0]    //Grabba la stringa dello style svg fino a "transform: ..."
    var newStyle = firstStylePart + "transform: scale("+ parseFloat(TRANSFORM).toFixed(2) +");"
    
    svgElement.setAttribute("style", newStyle);
 
    return svgElement

}


