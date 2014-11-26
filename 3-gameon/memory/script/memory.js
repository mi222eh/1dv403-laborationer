"use strict"

function MemoryGame(row, col, gameID, gameLayoutID){
    
    var THIS = this;
    
    
    var memory_Values = [];                                     //ska lagra 2 värden (brickorna)
    
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
        if (this.getgameLayoutID() === 0) {
            this.area.appendChild(this.layout0());
        }
        else if (this.getgameLayoutID() === 1) {
            layout = this.layout1();
            console.log(layout);
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
                a.addEventListener("click", function(event){
                    _this.clickAction(event);
                
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
    
    MemoryGame.prototype.clickAction = function(event){
        console.log(event.target);
        var index = event.target.getAttribute('class').slice(1);
        console.log(index);
        console.log(this.getPosition(index));
        event.target.setAttribute("src", "pics/" + this.getPosition(index) + ".png");
        event.target.setAttribute("alt", this.getPosition(index));
        this.checkValues(event.target);
        
    };
    
    MemoryGame.prototype.checkValues = function(targetValue){
        var _this = this;
        this.setmemoryValue(targetValue);
        if (_this.getWholememoryValue().length >= 2) {
            
            if(_this.validateValues()){
                alert("rätt!");
            }
            
            else{
                
                alert("fel!");
                setTimeout(this.flipBack, 1000, _this);
            
            }
             
        }
    };
    
    MemoryGame.prototype.validateValues = function(){
        var _this = this;
        
        var img1 = this.getmemoryValue(0);
        var img2 = this.getmemoryValue(1);
        
            
        console.log(this.getmemoryValue(0));   
        var pos1 = img1.getAttribute('class').slice(1);
        var pos2 = img2.getAttribute('class').slice(1);
        
        if (this.getPosition(pos1) === this.getPosition(pos2)) {
          return true;
        }
        
        else{
            return false
        }
    };
    
    MemoryGame.prototype.flipBack = function(_this){
        console.log(_this.getWholememoryValue())
        _this.getmemoryValue(0).setAttribute("src", "pics/0.png");
        _this.getmemoryValue(1).setAttribute("src", "pics/0.png");
        
        _this.clearmemoryValue();
    };
    
