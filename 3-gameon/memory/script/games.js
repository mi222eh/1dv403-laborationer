"use strict"

var myGames = {
    init: function(){
        var game1 = new MemoryGame(2, 2, "game1", 1);
        var game2 = new MemoryGame(5, 6, "game2", 1);
        var game3 = new MemoryGame(8, 2, "game3", 1);
        var game4 = new MemoryGame(10, 10, "game4", 1);
        game1.generateGame();
        game2.generateGame();
        game3.generateGame();
        game4.generateGame();
        
        game1.focus();
    }
};