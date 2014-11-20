"use strict"

window.onload = function () {
    init.init();
    
    //hämta lite element
    var input = document.getElementById('inputField');
    var button = document.getElementById('run');
    
    //lägg till lyssnaren till elementen
    button.addEventListener("click", init.run);
    input.addEventListener("keypress",init.keypressed);
};