"use strict"

function MemoryGame(row, col, gameID, gameLayoutID){
    
    this.getRow = function(){return row};
    this.getCol = function(){return col};
    
    var THIS = this;
    
    this.imgPosition = RandomGenerator.getPictureArray(row, col);
    
    this.area = document.getElementById(gameID);
    
    MemoryGame.prototype.generateGame = function(){
        
        if (gameLayoutID === 0) {
            THIS.area.appendChild(THIS.layout0());
        }
        else if (gameLayoutID === 1) {
            THIS.area.appendChild(THIS.layout1());
        }
    };
    MemoryGame.prototype.layout0 = function(){
        
    };
    MemoryGame.prototype.layout1 = function(){
        var picture = 0;
        
        var masterdiv = document.createElement('div');
        for (var i = 0; i < THIS.getRow(); i+=1) {
            
            var rowdiv = document.createElement('div');
            rowdiv.classList.add('row');
            
            for (var m = 0; m < THIS.getCol(); m+=1) {
                var coldiv = document.createElement('div');
                coldiv.classList.add(picture);
                
                var img = document.createElement('img');
                img.setAttribute("src", "pics/" + THIS.imgPosition[picture] + ".png");
                img.setAttribute("alt", "bricka nummer " + picture+1);
                
                coldiv.appendChild(img);
                
                rowdiv.appendChild(coldiv);
                picture += 1;
            }
            masterdiv.appendChild(rowdiv);
        }
        return masterdiv;
    };
    
    
    
}
