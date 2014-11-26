"use strict"

var init = {
    //räknare (för message listan)
    counter : 0,
    
    //räknare för antal meddelanden
    messageNumber : 0,
    
    //lista med meddelanden (för visning)
    messages: [],
    
    //lista med månader
    month: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Okteboer", "November", "December"],
    
    //funktion som rensar skrivfältet
    clearInputField : function(){
        var input = document.getElementById("inputField");
        input.value = "";
    },
    //funktion som håller reda på antal skrivna meddelanden och uppdaterar numret
    init: function(){
        var numberArea = document.getElementById("numberOfMessages");
        numberArea.innerHTML = init.messageNumber;
    },
    
    //funktion som läser av skrivfältet 
    readInput: function(){
        var input;
        input = document.getElementById("inputField").value;
        return input;
        
    },
    
    
    //då det skickas meddelande anropas denna funktion
    run: function(){
        
        //läs in text
        var text = init.readInput();
        
        //kontrollera om den är tom
        if (text.trim() === ""){
            alert("Kan inte skicka in ett tomt meddelande");
            return;
        }
        
        //skapa message objekt med hjälp av input
        var message = new Message(text, new Date());
        init.messages.push(message);
        
        //skriva ut
        init.writeMessages();
        
        //räkna upp
        init.counter += 1;
        init.messageNumber +=1;
        
        
        //scrolla längs ned
        var div = document.getElementById("messageField");
        div.scrollTop = div.scrollHeight;
        
        //uppdatera sidan (och rensa)
        init.init();
        init.clearInputField();
        
    },
    writeMessages: function(){
        
        //Skapa element
        var divImages = document.createElement('div');
        var div = document.createElement('div');
        var node = document.createElement('p');
        var span = document.createElement('span');
        var a = document.createElement('a');
        var img = document.createElement('img');
        var imgTime = document.createElement('img');
        var aTime = document.createElement('a');
        
        //Fånga området
        var area = document.getElementById("messageField");
        
        //Konfigurera elementen
        divImages.setAttribute("class", "floatRight");
        div.setAttribute("id", init.counter);
        img.setAttribute("src", "pics/remove.png");
        img.setAttribute("alt", "Ta bort");
        imgTime.setAttribute("alt", "Se Tiden");
        imgTime.setAttribute("src", "pics/time.png");
        aTime.setAttribute("href","#");
        aTime.addEventListener("click", function(){
            init.time(a.parentNode.parentNode.parentNode.getAttribute('id'));
        });
        a.setAttribute("href","#");
        a.addEventListener("click", function(){
            init.removeMessage(a.parentNode.parentNode.parentNode.getAttribute('id'));
        });
        
        //Lägg in text
        var text = init.messages[init.counter].getHTMLText();
        var textarray = text.split("<br />");
        for (var i = 0; i < textarray.length; i+=1) {
            
            node.appendChild(document.createTextNode(textarray[i]))
            node.appendChild(document.createElement('br'))
        }
        
        var date = document.createTextNode(init.messages[init.counter].getDateText());
        
        //Sätt allt på plats...
        
        span.appendChild(date);                             //...Date in i span
        aTime.appendChild(imgTime);                         //...Tidsbilden in i a-taggen för tiden
        a.appendChild(img);                                 //...TaBortBilden in i a-taggen för ta bort
        divImages.appendChild(a);                           //...a-taggen in i div av bilder
        divImages.appendChild(aTime);                       //...a-taggen in i div av bilder (samma som ovan)
        //node.innerHTML = text;                              //...lägg in meddelandet i p-taggen (kallas för node i detta fall)
        node.insertBefore(divImages, node.childNodes[0]);   //...sätt div med bilder in i p-taggen FÖRE texten
        node.appendChild(span);                             //...sätt datumen (som finns i span) sist i p-taggen
        div.appendChild(node);                              //...sätt in p-taggen i en div
        area.appendChild(div);                              //...sätt div in i området för texten (sist)
        
        
    },
    
    //funktion av borttagning av meddelande
    removeMessage: function (messageId){
        
        //Bekräfta ut av användaren
        if (confirm("Vill du verkligen radera meddelandet?")){
            
            //hämta meddelandet medhjälp av id
            var tmpMessage = document.getElementById(messageId);
            
            //låt webbläsaren ta bort innehållet
            tmpMessage.innerHTML = "";
            
            //räkna ned antalet meddelanden
            init.messageNumber += -1;
            
            //fixa div id:n
            init.fixId(messageId);
            
            //ta bort referensen till objektet i listan (index-numret har samma nummer som id:t)
            init.messages.splice(messageId, 1);
            
            
            
            //ta bort elementet div
            tmpMessage.parentNode.removeChild(tmpMessage);
            
            init.counter += -1;
            //uppdatera numret
            init.init();
        }
        else{
            return;
        }
    },
    
    fixId: function(messageId){
        var divNodes = document.getElementById('messageField').childNodes;
        
        for (var i = 0; i < init.messages.length; i+=1) {
            
            if (divNodes[i].getAttribute('id') > messageId) {
                divNodes[i].id = i-1;
            }
            
        }
        
        
    },
    
    //funktion för hämtandet av tid
    time: function(messageId){
        
        //hämta meddelandet
        var message = init.messages[messageId];
        
        //hämta tid
        var time = message.getDate();
        
        //skriv ut
        alert("Inlägget är skapat den " + time.getDate() + " " + (init.month[time.getMonth()]) +" "+ time.getFullYear() + " klockan " + message.getDateText());
        
    },
    
    //funktion som hanterar knapp-ned-tryckningar
    keypressed: function (key){
        
        //om enter trycktes och INTE shift
        if (!key.shiftKey && key.keyCode === 13) {
            
            //kör samma procedur som skicka-knappen
            init.run();
            
            //undvik webläsarens defaulthändelser (byta rad i detta fall) 
            key.preventDefault();
            
        }
        return false;
    },
};