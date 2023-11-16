/*
<label for="x_input">X:</label>
<input type="text" id="x_input" name="x_input">

<label for="y_input">Y:</label>
<input type="text" id="y_input" name="y_input"><br>

<label for="w_input">W:</label>
<input type="text" id="w_input" name="w_input">

<label for="h_input">H:</label>
<input type="text" id="h_input" name="h_input"><br>
*/

var x_input = document.getElementById("x_input");
var y_input = document.getElementById("y_input");
var w_input = document.getElementById("w_input");
var h_input = document.getElementById("h_input");

function transform_Info(){
    document.addEventListener("click", function(e){
        console.log("over on:  ", x_input.innerHTML)
        return "e.target.tagName"
    });
}