var toolSelectedText = "You selected the tool: "

document.addEventListener("keypress", function(e){
    var toolSelected = document.getElementById('toolSelected');

    var code = e.code;
    if (code == "KeyM"){
        toolSelected.innerHTML = toolSelectedText + "Rect Tool";
    }
    else if (code == "KeyE"){
        toolSelected.innerHTML = toolSelectedText + "Ellipse Tool";
    }
    else if (code == "KeyV"){
        toolSelected.innerHTML = toolSelectedText + "Selection Tool";
    }
    else if (code == "BracketRight"){
        toolSelected.innerHTML = toolSelectedText + "Resize (+)";
    }
    else if (code == "Slash"){
        toolSelected.innerHTML = toolSelectedText + "Resize (-)";
    }
    else{
        toolSelected.innerHTML = toolSelectedText + "";
    }

    console.log("You clicked " + code + ". You selected " + toolSelected)

});


function buttonToolSelector(toolChosen){
    console.log("HI ----> ", toolChosen)
    toolSelected.innerHTML = toolSelectedText + toolChosen;
    console.log("You clicked a button. You selected " + toolChosen)
}