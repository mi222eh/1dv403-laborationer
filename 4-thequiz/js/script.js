"use strict"

window.onload = function(){
    document.getElementById("button").addEventListener("click", function(){
        var xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                    
                }
                else{
                    console.log("läsfel, status: " + xhr.status);
                }
            }
            console.log("svar");
        };
        xhr.open("GET", "http://vhost3.lnu.se:20080/question/1", true);
        xhr.send(null);
});
};