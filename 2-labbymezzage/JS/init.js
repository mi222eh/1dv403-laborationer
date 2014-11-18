var init = {
    messageNumber : 0,
    messages: [],
    run: function(text){
        var message = new Message(text, new Date());
        init.messages.push(message);
    },
    readInput: function(){
        var input;
        input = document.getElementById("inputField").value;
        init.run(input);
    },
    writeMessages: function(){
        var area = queryselector("#messageArea");
        
    }
};