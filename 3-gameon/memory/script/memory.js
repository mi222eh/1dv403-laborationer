"use strict"

function MemoryGame(row, col, gameID, gameLayoutID){
    
    //Variabler som kommer att användas
    var focusX = 0;                                             //Fixerar fokuset (X)
    var focusY = 0;                                             //Fixerar fokuset (Y)
    var THIS = this;
    var memory_Values = [];                                     //ska lagra 2 värden (brickorna)
    var numberOfSuccess = 0;                                    //lager för antalet succéer
    var numberOfTries = 0;
    
    //<-----           Metoder till variablerna            ------>//
    this.addnumberOfTries = function(i){numberOfTries += i;}
    this.getnumberOfTries = function(){return numberOfTries}
    
    this.addnmberOfSuccess = function(i){numberOfSuccess += i};
    this.getnumberOfSuccess = function(){return numberOfSuccess};
    
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
    
    //<-------          Metoder för fokuset             ----->//
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
    
    
    //                  Array för slumpade siffror
    var Position = RandomGenerator.getPictureArray(this.getRow(), this.getCol());
    
    //              Område för spelplanen
    this.area = document.getElementById(gameID);
}

    //<-------          Metod för att generera spelplanen   ------>//
    MemoryGame.prototype.generateGame = function(){
        
        //Generar allt gemensamt här...
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
        
        //Beorende på ID, skapa layout
        if (this.getgameLayoutID() === 0) {
            
            this.area.appendChild(this.layout0());
        }
        else if (this.getgameLayoutID() === 1) {
            
            this.area.appendChild(this.layout1());
        }
    };
    
    // <------- För ID 0-------->//
    MemoryGame.prototype.layout0 = function(){
        
    };
    
    // <------- För ID 1-------->//
    MemoryGame.prototype.layout1 = function(){
        var _this = this;
        
        //Variabel för att hålla koll på antalet bilder...
        var picture = 0;
        
        //En div som håller alla brickor
        var masterdiv = document.createElement('div');
        masterdiv.classList.add('bricks');
        
        //<------- Generar rad och kolumn beroende av parametrarna ------>//
        for (var i = 0; i < this.getRow(); i+=1) {
            
            var rowdiv = document.createElement('div');
            rowdiv.classList.add('row');                    //klass skapas för stilmallen
            
            for (var m = 0; m < this.getCol(); m+=1) {
                
                //taggar
                var coldiv = document.createElement('div');
                var img = document.createElement('img');
                var a = document.createElement('a');
                
                //konfigurationer
                img.setAttribute("alt", "?");
                img.setAttribute("height", "24px");
                img.setAttribute("width", "24px");
                img.setAttribute("src", "pics/0.png");
                img.classList.add("_" + picture);
                
                a.setAttribute("href", "#");
                this.eventListeners(a, this);
                        a.addEventListener("keypress", function(event) {
                        _this.navigation(event);
                 });
                
                //sätta dit
                a.appendChild(img);
                coldiv.appendChild(a);
                
                rowdiv.appendChild(coldiv);
                picture += 1;
            }
            masterdiv.appendChild(rowdiv);
        }
        
        return masterdiv;           //returnera mäster-diven
    };
    
    //<------- Metod för navigation ------->//
    MemoryGame.prototype.navigation = function(event){
        var code = event.keyCode;
        
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
        
    //<--------------   Metod för klickhändelser (då en bricka ska vändas) -------->//
    MemoryGame.prototype.clickAction = function(event){
                var _this = this;
                var a = event.currentTarget;
                var image = a.childNodes[0];
                var index = image.getAttribute('class').slice(1);
                var aClone = a.cloneNode(true);
                
                //Nya attribut på bilden sätts
                image.setAttribute("alt", this.getPosition(index));
                image.setAttribute("src", "pics/" + this.getPosition(index) + ".png");
                
                //Ersätt a med klonad a (för att ta bort listeners)
                a.parentNode.replaceChild(aClone, a);
                
                //Hoppsan, "keypress" gick också bort
                aClone.addEventListener("keypress", function(event) {
                    _this.navigation(event);
                });
                
                this.checkValues(aClone.childNodes[0]);
                
                this.focus();
                
     
       
        
    };
    
    //<------------------- Kontroll av värden (och lagrande) ---------->//
    MemoryGame.prototype.checkValues = function(targetValue){
        
        var _this = this;
        
        //Sätt in referensen till image-taggen i arrayen
        this.setmemoryValue(targetValue);
        
        //Kolla arrayens storlek (förutsätter att den blir högst två, men man vet aldrig)
        if (_this.getWholememoryValue().length >= 2) {
            
            if(_this.validateValues()){
                
                _this.clearmemoryValue();
            }
            
            else{
                
                setTimeout(this.flipBack, 1000, _this);
                _this.clearmemoryValue();
                return;
            
            }
            
             
        }
    };
    //<----------------  Jämför värden i arrayen ------------->//
    MemoryGame.prototype.validateValues = function(){
        
        //hämta ut till en lokal variabel
        var img1 = this.getmemoryValue(0);
        var img2 = this.getmemoryValue(1);
        
        var pos1 = img1.getAttribute('class').slice(1);
        var pos2 = img2.getAttribute('class').slice(1);
        
        if (this.getPosition(pos1) === this.getPosition(pos2)) {
          return true;
        }
        
        else{
            return false;
        }
    };
    
    //<------------------ Ansvara för att vända tillbaka brickorna ------------>//
    MemoryGame.prototype.flipBack = function(_this){
        
        //sätt attribut och alt...
        _this.getmemoryValue(0).setAttribute("src", "pics/0.png");
        _this.getmemoryValue(0).setAttribute("alt", "?");
        
        _this.getmemoryValue(1).setAttribute("src", "pics/0.png");
        _this.getmemoryValue(1).setAttribute("alt", "?");
        
        //Lägg till listeners igen
        _this.eventListeners(_this.getmemoryValue(0).parentNode, _this);
        _this.eventListeners(_this.getmemoryValue(1).parentNode, _this);
        
    };
    
    //<-------------- Lägger till en listener på taggen som kommer igenom (till clickAction) ------->//
    MemoryGame.prototype.eventListeners = function(el, _this){
        el.addEventListener("click", function(event){
            _this.clickAction(event);
            }
        );

    };
    
    MemoryGame.prototype.updateNumbers = function(){
        
    };
    
