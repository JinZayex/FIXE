function levelContent(children){
    if (children.length == 0){
        console.log("children lenght: ",children.length);
        newContent = "\< No shape detected >";}

    else{
        newContent = "";
        for (var i = 0; i < children.length; i++){
            newContent += "\< "+String(children[i].tagName)+" >"+ "<br>"}
    }
    return newContent
}