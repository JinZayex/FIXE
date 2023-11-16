const tools = document.querySelectorAll(".btn-tool");
const colorOfClicked = "white"
var selectedTool = undefined

tools.forEach(function (tool) { 
    tool.addEventListener("click", function (e) 
    {
        var classes = e.currentTarget.classList;
        var targeted = e.currentTarget;

        console.log("You clicked!", classes)

        if (classes.contains("btn-tool-select")) { selectedTool = "tool-select" }
        if (classes.contains("btn-tool-move"))   { selectedTool = "tool-move"   }
        if (classes.contains("btn-tool-circle")) { selectedTool = "tool-circle" }
        if (classes.contains("btn-tool-rect"))   { selectedTool = "tool-rect"   } 

        resetColor()
        targeted.style.backgroundColor = colorOfClicked;
    });

});


function resetColor(){
    tools.forEach(function(tool){
        tool.style.backgroundColor = "transparent";
    });

}