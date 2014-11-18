function Message(message, date){
    
    var THIS = this;
    
    this.getText = function(){
        return message;
    };
    this.setText = function(_message){
        message = _message;
    };
    
    this.getDate = function(){
        return date;
    };
    this.setDate = function(_date){
        date = _date;
    };
    
    Message.prototype.toString = function(){
        return this.getText() + " (" + Message.prototype.getDateText()+ ")";
    }; 
    
    Message.prototype.getDateText = function(){
        var tmpdate = THIS.getDate();
        
        return tmpdate.getDate() + "-" + (tmpdate.getMonth()+1) + "-" + tmpdate.getFullYear() + " " + tmpdate.getHours() + ":" + tmpdate.getMinutes();
    };
    Message.prototype.getHTMLText = function(){
        return this.getText() + " (" + Message.prototype.getDateText() + ")";
    };
}