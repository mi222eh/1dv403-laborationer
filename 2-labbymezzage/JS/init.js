var init = {
    counter : 0,
    messageNumber : 0,
    messages: [],
    init: function(){
        var numberArea = document.getElementById("numberOfMessages");
        numberArea.innerHTML = init.messageNumber;
    },
    readInput: function(){
        var input;
        input = document.getElementById("inputField").value;
        return input;
        
    },
    run: function(){
        
        var text = init.readInput();
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
        init.init();
        
        //scrolla längs ned
        var div = document.getElementById("messageField");
        div.scrollTop = div.scrollHeight;
        
    },
    writeMessages: function(){
        //Create elements
        var divImages = document.createElement('div');
        var div = document.createElement('div');
        var node = document.createElement('p');
        var span = document.createElement('span');
        var a = document.createElement('a');
        var img = document.createElement('img');
        var imgTime = document.createElement('img');
        var aTime = document.createElement('a');
        
        //get the area
        var area = document.getElementById("messageField");
        
        //configure elements
        divImages.setAttribute("class", "floatRight");
        div.setAttribute("id", init.counter);
        img.setAttribute("src", "pics/remove.png");
        img.setAttribute("alt", "Ta bort");
        imgTime.setAttribute("alt", "Se Tiden");
        imgTime.setAttribute("src", "pics/time.png");
        aTime.setAttribute("href","#");
        aTime.setAttribute("onClick", "init.time(" + init.counter + ")");
        a.setAttribute("onClick", "init.removeMessage("+ init.counter + ")");
        a.setAttribute("href","#");

        //create text nodes
        var text = document.createTextNode(init.messages[init.counter].getText());
        var date = document.createTextNode(init.messages[init.counter].getDateText());
        
        //put everything in place
        span.appendChild(date);
        aTime.appendChild(imgTime);
        a.appendChild(img);
        divImages.appendChild(a);
        divImages.appendChild(aTime);
        node.appendChild(divImages);
        node.appendChild(text);
        node.appendChild(span);
        div.appendChild(node);
        area.appendChild(div)
        
    },
    removeMessage: function (messageId){
        if (confirm("Är du säker att du vill radera meddelandet?")){
            var tmpMessage = document.getElementById(messageId);
            tmpMessage.innerHTML = "";
            init.messageNumber += -1;
            init.messages[messageId] = null;
            init.init();
        }
        else{
            return
        }
    },
    time: function(messageId){
        var message = init.messages[messageId];
        var time = message.getDate();
        alert("Inlägget är skapat " + time.getDate() + "-" + (time.getMonth()+1) +"-"+ time.getFullYear() + " klockan " + message.getDateText());
        
    }
};