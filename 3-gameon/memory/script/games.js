var myGames = {
    init: function(){
        var game1 = new MemoryGame(4, 4, "game1", 1);
        var game2 = new MemoryGame(5, 6, "game2", 1);
        var game3 = new MemoryGame(2, 2, "game3", 1);
        game1.generateGame();
        game2.generateGame();
        game3.generateGame();
        console.log(game1);
        console.log(game2);
        
        game1.focus();
    }
};