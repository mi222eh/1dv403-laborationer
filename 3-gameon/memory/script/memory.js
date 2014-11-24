"use strict"

function MemoryGame(row, col, gameID, gameLayoutID){
    
    this.getRow = function(){return row};
    this.getCol = function(){return col};
    
    this.imgPosition = RandomGenerator.getPictureArray(row, col);
    
    this.area = document.getElementById(gameID);
    
    MemoryGame.prototype.generateGame = function(){
        
        if (gameLayoutID === 0) {
            this.area.appendChild(this.layout0());
        }
        else if (gameLayoutID === 1) {
            this.area.appendChild(this.layout1());
        }
    };
    MemoryGame.prototype.layout0 = function(){
        
    };
    MemoryGame.prototype.layout1 = function(){
        var picture = 0;
        
        var masterdiv = document.createElement('div');
        masterdiv.classList.add('bricks');
        for (var i = 0; i < this.getRow(); i+=1) {
            
            var rowdiv = document.createElement('div');
            rowdiv.classList.add('row');
            
            for (var m = 0; m < this.getCol(); m+=1) {
                var coldiv = document.createElement('div');
                coldiv.classList.add(picture);
                
                var img = document.createElement('img');
                img.setAttribute("src", "pics/0.png");
                img.setAttribute("alt", "nr " + (picture+1));
                img.setAttribute("height", "24px");
                img.setAttribute("width", "24px");
                
                var a = document.createElement('a');
                a.setAttribute("href", "#");
                a.addEventListener("click", function(){
                    
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
        
    };
    
    
    
}
