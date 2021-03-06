"use strict"


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
}
    Message.prototype.toString = function(){
        return this.getText() + " (" + Message.prototype.getDateText()+ ")";
    }; 
    
    Message.prototype.getDateText = function(){
        var tmpdate = this.getDate();
        
        return tmpdate.getHours() + ":" + (tmpdate.getMinutes()<10? '0':'') + tmpdate.getMinutes() + ":" + (tmpdate.getSeconds()<10? '0':'') +tmpdate.getSeconds();
    };
    Message.prototype.getHTMLText = function(){
        return this.getText().replace(/\r?\n/g, '<br />');
    };