"use strict"

var myGames = {
    init: function(){
        var game1 = new MemoryGame(2, 2, "game1", 1);
        var game2 = new MemoryGame(8, 2, "game2", 0);
        game1.generateGame();
        game2.generateGame();
        
        game1.focus();
    }
};