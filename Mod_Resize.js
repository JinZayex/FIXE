document.addEventListener("keypress", function(e){
    // Select all <svg> elements
    var svgElement = document.getElementsByTagName('svg')[0];

    var code = e.code;
    if (code == "BracketRight"){
        console.log("resize boy")
        svgElement.style.transform = "transform(1.2)";

        
    }
    else if (code == "Slash"){
        console.log("upresize boy")
        svgElement.style.transform = "transform(0.5)";

    }
    

});