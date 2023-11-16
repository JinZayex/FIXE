function exportSVG(svg){
    var SVG =  document.getElementsByTagName('svg')[0];
    //Contenuto di motherspace
    var svgContent = SVG.innerHTML;

    console.log(svgContent);

    console.log("YourSvgContent!",svgContent)

    var widthValue = parseInt(SVG.getAttribute('width'))
    var heightValue = parseInt(SVG.getAttribute('height'))
    console.log(widthValue, heightValue)

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

