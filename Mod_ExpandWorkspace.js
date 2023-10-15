//Grabbo il bottone che permette di chiamare la funzione 
var myButton = document.getElementById('myButton');

var TITLE = document.getElementsByTagName('title')[0]; 
var BODY = document.getElementsByTagName('body')[0];

//Se avviene il click sul my Button, do...
myButton.addEventListener('click', function() {
    
    // Grabbo i valori inseriti negli <input>
    var width_Input = document.getElementById('w_idth').value;
    var height_Input = document.getElementById('h_eight').value;

    // Cambio l'HTML e il titolo
    var newBody =   '<h1 id="mainTitle">FIXE!</h1>' +       
                    '<h3>Ecco il tuo workspace!</h3>' +
                    '<div id="toolSelected">You selected the tool: </div>'+
                    '<br><br>'+
                    '<button onclick="download()" id="mySaveButton" style="background-color: #ff00ff;">Esporta</button><br>' +    // Creo il bottone per salvare
                    '<br><br>'+
                    '<svg id="Motherspace" width="' + width_Input +'" height="' +height_Input + '" style="border: inset 5px; background-color:white;">'+
                    '</svg> '    // Cambio width e height di svg (Motherspace);


    BODY.innerHTML = newBody
    TITLE.innerHTML = "FIXE!"


});
