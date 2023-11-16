var scale = 1
const btns = document.querySelectorAll(".btn-menu");

const svg = document.getElementsByTagName('svg')[0];
const widthSVG =  parseInt(svg.getAttribute("width"));
const heightSVG = parseInt(svg.getAttribute("height"));
var computedStyle = window.getComputedStyle(svg);     // Get the CSS properties
var leftSVG = parseInt(computedStyle.getPropertyValue("left"));
var topSVG = parseInt(computedStyle.getPropertyValue("top"));


btns.forEach(function (btn) { 
    btn.addEventListener("click", function (e) 
    {
    var classes = e.currentTarget.classList;
    console.log(classes)
    if (classes.contains("btn-export"))   {exportSVG()}
    if (classes.contains("btn-upsize"))   {scale += 0.1; resizeSVG(svg);}
    if (classes.contains("btn-downsize")) {scale -= 0.1; resizeSVG(svg);}
    
    

    });
});


