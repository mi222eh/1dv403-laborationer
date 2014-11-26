"use strict"

function MemoryGame(row, col, gameID, gameLayoutID){
    
    
    var focusX = 0;
    var focusY = 0;
    var THIS = this;
    var memory_Values = [];                                     //ska lagra 2 värden (brickorna)
    var numberOfSuccess = 0;
    var numberOfTries = 0;
    
    
    this.addnumberOfTries = function(i){numberOfTries += i;}
    this.getnumberOfTries = function(){return numberOfTries}
    this.addnmberOfSuccess = function(i){numberOfSuccess += i};
    this.getnumberOfSuccess = function(){return numberOfSuccess};
    this.handleDown = function(){
        if ((focusY + 1) < (row)) {
            focusY += 1;
        }
        this.focus();
    };
    this.handleUp = function(){
      if ((focusY - 1) >= 0) {
          focusY += -1;
      }  
      this.focus();
    };
    this.handleLeft = function(){
        if ((focusX - 1) >= 0) {
            focusX += -1;
        }
        this.focus();
    };
    this.handleRight = function(){
        if ((focusX+1) < (col)) {
            focusX += 1;
        }
        this.focus();
    };
    this.focus = function(){
        var targetFocus = document.getElementById(gameID).getElementsByClassName('bricks')[0];
        var rowNumber = targetFocus.childNodes[focusY];
        var columnNumber = rowNumber.childNodes[focusX];
        columnNumber.childNodes[0].focus();
    };
    
    this.getgameLayoutID = function(){return gameLayoutID};
    this.getgameID = function(){return gameID};
    
    this.getRow = function(){return row};
    this.getCol = function(){return col};
    
    this.getPosition = function(i){return Position[i]};
    this.setPosition = function(ref){Position.push(ref)};
    
    this.setmemoryValue = function(ref){memory_Values.push(ref)};
    this.getmemoryValue = function(i){return memory_Values[i]};
    this.getWholememoryValue = function(){return memory_Values};
    this.clearmemoryValue = function(){memory_Values = []};
    
    var Position = RandomGenerator.getPictureArray(this.getRow(), this.getCol());
    
    console.log(this.getPosition());
    
    this.area = document.getElementById(gameID);
}
    MemoryGame.prototype.generateGame = function(){
        var layout;
        
        var gameInfoDiv = document.createElement('div');
        var textNode = document.createTextNode('Antal försök: ');
        var divtext = document.createElement('div');
        var divWin = document.createElement('div');
        var divNumber = document.createElement('div');
        
        
        divtext.appendChild(textNode);
        divtext.appendChild(divNumber);
        gameInfoDiv.appendChild(divtext);
        gameInfoDiv.appendChild(divWin);
        this.area.appendChild(gameInfoDiv);
        
        
        if (this.getgameLayoutID() === 0) {
            this.area.appendChild(this.layout0());
        }
        else if (this.getgameLayoutID() === 1) {
            layout = this.layout1();
            this.area.appendChild(layout);
        }
    };
    MemoryGame.prototype.layout0 = function(){
        
    };
    MemoryGame.prototype.layout1 = function(){
        var _this = this;
        var picture = 0;
        
        
        
        
        
        var masterdiv = document.createElement('div');
        masterdiv.classList.add('bricks');
        for (var i = 0; i < this.getRow(); i+=1) {
            
            var rowdiv = document.createElement('div');
            rowdiv.classList.add('row');
            
            for (var m = 0; m < this.getCol(); m+=1) {
                var coldiv = document.createElement('div');
                
                
                var img = document.createElement('img');
                
                
                img.setAttribute("alt", "?");
                img.setAttribute("height", "24px");
                img.setAttribute("width", "24px");
                img.setAttribute("src", "pics/0.png");
                img.classList.add("_" + picture);
                
                
                var a = document.createElement('a');
                a.setAttribute("href", "#");
                this.eventListeners(a, this);
                        a.addEventListener("keypress", function(event) {
                        _this.navigation(event);
                 });
                
                a.appendChild(img);
                coldiv.appendChild(a);
                
                rowdiv.appendChild(coldiv);
                picture += 1;
            }
            masterdiv.appendChild(rowdiv);
        }
        
        
        
        
        return masterdiv;
    };
    
    MemoryGame.prototype.navigation = function(event){
        var code = event.keyCode;
    
        console.log(code);
        
        switch (code) {
            case 38:
                this.handleUp();
                event.preventDefault();
                break;
                
            case 37:
                this.handleLeft();
                event.preventDefault();
                break;
            
            case 39:
                this.handleRight();
                event.preventDefault();
                break;
            
            case 40:
                this.handleDown();
                event.preventDefault();
                break;
            
            default:
        }
    }
        
        
    MemoryGame.prototype.clickAction = function(event){
                var _this = this;
                console.log(event.currentTarget);
                var a = event.currentTarget;
                var image = a.childNodes[0];
                var index = image.getAttribute('class').slice(1);
                
                console.log(index);
                console.log(this.getPosition(index));
                
                image.setAttribute("src", "pics/" + this.getPosition(index) + ".png");
                image.setAttribute("alt", this.getPosition(index));
                
                
                var aClone = a.cloneNode(true);
                a.parentNode.replaceChild(aClone, a);
                aClone.addEventListener("keypress", function(event) {
                    _this.navigation(event);
                });
                this.checkValues(aClone.childNodes[0]);
                
                this.focus();
                
     
       
        
    };
    
    MemoryGame.prototype.checkValues = function(targetValue){
        var _this = this;
        this.setmemoryValue(targetValue);
        if (_this.getWholememoryValue().length >= 2) {
            
            if(_this.validateValues()){
                
                _this.clearmemoryValue();
            }
            
            else{
                
                setTimeout(this.flipBack, 1000, _this);
                return;
            
            }
            
             
        }
    };
    
    MemoryGame.prototype.validateValues = function(){
        
        var img1 = this.getmemoryValue(0);
        var img2 = this.getmemoryValue(1);
        
            
        console.log(this.getmemoryValue(0));   
        var pos1 = img1.getAttribute('class').slice(1);
        var pos2 = img2.getAttribute('class').slice(1);
        
        if (this.getPosition(pos1) === this.getPosition(pos2)) {
          return true;
        }
        
        else{
            return false;
        }
    };
    
    MemoryGame.prototype.flipBack = function(_this){
        console.log(_this.getWholememoryValue());
        _this.getmemoryValue(0).setAttribute("src", "pics/0.png");
        _this.getmemoryValue(1).setAttribute("src", "pics/0.png");
        
        _this.eventListeners(_this.getmemoryValue(0).parentNode, _this);
        _this.eventListeners(_this.getmemoryValue(1).parentNode, _this);
        
        _this.clearmemoryValue();
    };
    
    MemoryGame.prototype.eventListeners = function(el, _this){
        el.addEventListener("click", function(event){
            _this.clickAction(event);
            }
        );

    };
    
    
