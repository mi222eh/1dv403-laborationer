"use strict"

function MemoryGame(row, col, gameID, gameLayoutID){
    
    //Variabler som kommer att användas
    var focusX = 0;                                             //Fixerar fokuset (X)
    var focusY = 0;                                             //Fixerar fokuset (Y)
    var THIS = this;
    var memory_Values = [];                                     //ska lagra 2 värden (brickorna)
    var numberOfSuccess = 0;                                    //lager för antalet succéer (kommer att avgöra när segerTexten kommer)
    var numberOfTries = 0;
    
    //<-----           Metoder till variablerna            ------>//
    this.setfocusX = function(i){focusX = i};
    this.setfocusY = function(i){focusY = i};
    
    this.addnumberOfTries = function(i){numberOfTries += i;};
    this.getnumberOfTries = function(){return numberOfTries};
    
    this.addnmberOfSuccess = function(i){numberOfSuccess += i};
    this.getnumberOfSuccess = function(){return numberOfSuccess};
    
    this.getgameLayoutID = function(){return gameLayoutID};
    this.getgameID = function(){return gameID};
    
    this.getRow = function(){return row};
    this.getCol = function(){return col};
    
    this.getPosition = function(i){return Position[i]};
    this.setPosition = function(ref){Position.push(ref)};
    this.getPositionArray = function(){return Position};
    
    this.setmemoryValue = function(ref){memory_Values.push(ref)};
    this.getmemoryValue = function(i){return memory_Values[i]};
    this.getWholememoryValue = function(){return memory_Values};
    this.clearmemoryValue = function(){memory_Values = []};
    
    /*
    this.resetValues = function(){
        if (this.listenToClick) {
        numberOfSuccess = 0;
        numberOfTries = 0;
        memory_Values = [];
        Position = RandomGenerator.getPictureArray(this.getRow(), this.getCol());
        }
    };
    */
    
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
    
    //              Område för spelplanen@
    this.area = document.getElementById(gameID);
    
    this.listenToClick = true;
    
    
}  

    ////<-------          (Test) Metod för att återställa spelplanen   ------>//
    MemoryGame.prototype.reset = function(_this){
        _this.area.innerHTML = "";
        _this.resetValues();
        _this.generateGame();
        
    };

    //<-------          Metod för att generera spelplanen   ------>//
    MemoryGame.prototype.generateGame = function(){
        var _this = this;
        
        //<--bara för test-->//
        var resetButton = document.createElement('button');
        var resetText = document.createTextNode("Reset");
        resetButton.appendChild(resetText);
        resetButton.setAttribute("type", "button");
        resetButton.addEventListener("click", function(){
            _this.reset(_this)
        });
        
        
        //<--slut på test-->//
        
        //Generar allt gemensamt här...
        var gameInfoDiv = document.createElement('div');
        var textNode = document.createTextNode('Antal försök: ');
        var divtext = document.createElement('div');
        var divWin = document.createElement('div');
        var divNumber = document.createElement('div');
        
        divNumber.classList.add('_tries');
        divWin.classList.add('_win');
        
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
        this.area.appendChild(resetButton);
        this.updateNumbers();
    };
    
    // <------- För ID 0-------->//
    MemoryGame.prototype.layout0 = function(){
        var i,m, img, coldiv, rowdiv, a;
        var _this = this;
        
        var picture = 0;
        
        var masterdiv = document.createElement('div');
        masterdiv.classList.add('bricks');
        
        for (i = 0; i < this.getRow(); i+=1) {
            
            rowdiv = document.createElement('row');
            rowdiv.classList.add('row');
            for (m = 0; m < Math.floor((this.getCol()/2)); m+=1) {
                
                coldiv = document.createElement('div');
                img = document.createElement('img');
                a = document.createElement('a');
                
                //konfigurationer
                img.setAttribute("alt", "?");
                img.setAttribute("height", "24px");
                img.setAttribute("width", "24px");
                img.setAttribute("src", "pics/0.png");
                img.classList.add("brick_" + picture);
                
                a.setAttribute("href", "#");
                a.addEventListener("click", function(event) {
                    _this.clickAction(event, _this);
                 });
                        a.addEventListener("keydown", function(event) {
                        _this.navigation(event, _this);
                 });
                
                //sätta dit
                a.appendChild(img);
                coldiv.appendChild(a);
                
                rowdiv.appendChild(coldiv);
                picture += 1;
                if (m === (Math.floor((this.getCol()/2)-1))) {
                    coldiv.classList.add('rightPadding');
                }
                
            }
        
            for (m = Math.floor((this.getCol()/2)); m < this.getCol() ; m+=1) {
                coldiv = document.createElement('div');
                img = document.createElement('img');
                a = document.createElement('a');
                
                //konfigurationer
                img.setAttribute("alt", "?");
                img.setAttribute("height", "24px");
                img.setAttribute("width", "24px");
                img.setAttribute("src", "pics/0.png");
                img.classList.add("brick_" + picture);
                
                a.setAttribute("href", "#");
                a.addEventListener("click", function(event) {
                    _this.clickAction(event, _this);
                 });
                        a.addEventListener("keydown", function(event) {
                        _this.navigation(event, _this);
                 });
                
                //sätta dit
                a.appendChild(img);
                coldiv.appendChild(a);
                
                rowdiv.appendChild(coldiv);
                picture += 1;
                if (m === Math.floor((this.getCol()/2))) {
                    coldiv.classList.add('leftPadding');
                }
            }
            masterdiv.appendChild(rowdiv);
        }
        _this.listenToClick = true;
        return masterdiv;
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
                img.classList.add("brick_" + picture);
                
                a.setAttribute("href", "#");
                a.addEventListener("click", function (event) {
                    _this.clickAction(event, _this);
                });
                a.addEventListener("keydown",function (event) {
                    _this.navigation(event, _this);
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
    MemoryGame.prototype.navigation = function(event, _this){
        var code = event.keyCode;
        
        switch (code) {
            case 38:
                _this.handleUp();
                event.preventDefault();
                break;
                
            case 37:
                _this.handleLeft();
                event.preventDefault();
                break;
            
            case 39:
                _this.handleRight();
                event.preventDefault();
                break;
            
            case 40:
                _this.handleDown();
                event.preventDefault();
                break;
            
            default:
        }
    }
        
    //<--------------   Metod för klickhändelser (då en bricka ska vändas) -------->//
    MemoryGame.prototype.clickAction = function(event, _this){
        
            if (_this.listenToClick) {
                
                    event.preventDefault();
                    
                    var a = event.currentTarget;
                    
                    var aClone = a.cloneNode(true);
                    
                    //Ersätt a med klonad a (för att ta bort listeners)
                    a.parentNode.replaceChild(aClone, a);
                    
                    var image = aClone.childNodes[0];
                    var index = image.getAttribute('class').slice(6);
                    
                    
                    
                    
                    //Nya attribut på bilden sätts
                    image.setAttribute("alt", _this.getPosition(index));
                    image.setAttribute("src", "pics/" + _this.getPosition(index) + ".png");
                    
                    
                    
                    //Hoppsan, "keypress" gick också bort
                    aClone.addEventListener("keydown", function (event) {
                        _this.navigation(event, _this);
                    });
                    
                    
                    _this.checkValues(aClone.childNodes[0]);
                    _this.setXAndYFocus(aClone);
            }
                

                
     
       
        
    };
    
    //<------------------- Kontroll av värden (och lagrande) ---------->//
    MemoryGame.prototype.checkValues = function(targetValue){
        
        var _this = this;
        
        //Sätt in referensen till image-taggen i arrayen
        _this.setmemoryValue(targetValue);
        console.log(_this.getWholememoryValue());
        
        //Kolla arrayens storlek (förutsätter att den blir högst två, men man vet aldrig)
        if (_this.getWholememoryValue().length >= 2) {
            
            
            if(_this.validateValues()){
                
                _this.addnmberOfSuccess(2);
                _this.clearmemoryValue();
            }
            
            else{
                _this.listenToClick = false;
                setTimeout(_this.flipBack, 1000, _this);
            
            }
            _this.addnumberOfTries(1);
            _this.updateNumbers();
             
        }
    };
    
    //<----------------  Jämför värden i arrayen ------------->//
    MemoryGame.prototype.validateValues = function(){
        
        //hämta ut till en lokal variabel
        var img1 = this.getmemoryValue(0);
        var img2 = this.getmemoryValue(1);
        
        var pos1 = img1.getAttribute('class').slice(6);
        var pos2 = img2.getAttribute('class').slice(6);
        
        if (this.getPosition(pos1) === this.getPosition(pos2)) {
          return true;
        }
        
        else{
            return false;
        }
    };
    
    //<------------------ Ansvara för att vända tillbaka brickorna ------------>//
    MemoryGame.prototype.flipBack = function(_this){
        
        console.log(_this);
        //sätt attribut och alt...
        _this.getmemoryValue(0).setAttribute("src", "pics/0.png");
        _this.getmemoryValue(0).setAttribute("alt", "?");
        
        _this.getmemoryValue(1).setAttribute("src", "pics/0.png");
        _this.getmemoryValue(1).setAttribute("alt", "?");
        
        //Lägg till listeners igen
        _this.getmemoryValue(0).parentNode.addEventListener("click", function (event) {
                    _this.clickAction(event, _this);
                 });
        _this.getmemoryValue(1).parentNode.addEventListener("click", function (event) {
                    _this.clickAction(event, _this);
                 });
                 
        _this.clearmemoryValue();
        setTimeout(function() {_this.listenToClick = true;}, 100);
        
    };
    
    //<------------------ Uppdaterar numret ------------>//
    MemoryGame.prototype.updateNumbers = function(){
        var placeToWriteNumber = document.getElementById(this.getgameID()).getElementsByClassName('_tries')[0];
        placeToWriteNumber.innerHTML = this.getnumberOfTries();
        
        if (this.getnumberOfSuccess() === this.getPositionArray().length) {
            var winplace = document.getElementById(this.getgameID()).getElementsByClassName('_win')[0];
            winplace.innerHTML = "Memory: avklarat";
        }
    };
    
    //<------------------ X och Y focus (tillagd för att inte göra konflikt med onClick eventet) ------------>//
    MemoryGame.prototype.setXAndYFocus = function(focusingTarget){
        var x = 0, y = 0, tmpTarget;
        
        focusingTarget = focusingTarget.parentNode;
        
        tmpTarget = focusingTarget;
        
        while ((focusingTarget = focusingTarget.previousSibling) != null){
            x += 1;
        }
        var YNode = tmpTarget.parentNode;
        
        while ((YNode = YNode.previousSibling) != null){
            y += 1;
        }
        
        this.setfocusX(x);
        this.setfocusY(y);
        this.focus();
    };
    
