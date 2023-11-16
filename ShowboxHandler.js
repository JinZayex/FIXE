var newContent;

function showContent(content_Id, event) {
console.log("show text")    

var contentClicked = document.getElementById(content_Id);

updateContent(content_Id)

var content_status = window.getComputedStyle(contentClicked).display; // --> none || block  (nascosto, mostrato) 
if (content_status == 'none') 
    {contentClicked.style.display = "block";}
else if (content_status == 'block')
    {contentClicked.style.display = "none";}

}


function updateContent(content_Id){
    var SVG = document.getElementsByTagName('svg')[0];
    var contentClicked = document.getElementById(content_Id);

    if      (content_Id == "levels")    { var children = SVG.children;  
                                        newContent = levelContent(children)}
    else if(content_Id = "transform")   { return 0; newContent = transform_Info()}
    else if(content_Id == "contact")    {newContent = "Hello contact"}
    else if(content.includes("About"))  {newContent = "Hello about"}

    else{console.log("\n\nSomething went wrong in showContent function\n\n")}

    contentClicked.innerHTML = newContent;
}

