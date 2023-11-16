function download(){
    var Motherspace =  document.getElementById('Motherspace');
    //Contenuto di motherspace
    var svgContent = Motherspace.innerHTML;

    /*
    //Dal quale rimuoviamo la prima stringa <rect che sarebbe il workspace e il tag finale </rect>
    svgContent = svgContent.split("rgb(0,0,0)\">").pop()
    svgContent = svgContent.replace("</rect>"," ")
    */

    console.log("YourSvgContent!",svgContent)

    var widthValue = Motherspace.getAttribute('width')
    var heightValue = Motherspace.getAttribute('height')
    
    var file = new String('<svg id=\"CERCA_ID\" data-name=\"MyName\" xlms=\"http://www.w3.org/2000/svg\" width=\" ' + widthValue + '" height=\" '+ heightValue+"\"\>");
    var file = file+ svgContent+ "</svg>";
    
    // Creiamo un oggetto Blob con il testo
    var blob = new Blob([file], { type: 'text/plain' });

    // Creiamo un elemento anchor per il download del file
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);

    let fileName = prompt("Dai un nome al tuo file: ", "Fixe");
    a.download = fileName+'.svg';             

    // Aggiungiamo l'elemento anchor al documento e simuliamo il click
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();

    // Rimuoviamo l'elemento anchor dal documento
    document.body.removeChild(a);
    
}

