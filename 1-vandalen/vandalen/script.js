"use strict";

var makePerson = function(persArr){
    //deklarera
    var names, ages, object, average, stringNames;
    
    
    object = {};
    names = [];
    ages = [];
    
    //Kör en function för alla element:
    persArr.forEach(function(Element, Index){
        names[Index] = Element.name;
        ages[Index] = Element.age;
    });
    
    //Sortera åldern
    ages.sort(function(a, b){
        return a-b;
    });
    
    //Plussa ihop alla åldrar
    average = ages.reduce(function(a, b){
       return a+b; 
    });
    
    //Räkna ut medelåldern
    average = average/(persArr.length);
    
    //Avrunda medelåldern
    average = Math.round(average);
    
    
    
    //Sortera namnen, skickar med en funktion som beskriver sorteringen
    names.sort(function(a,b){
        var nameA,nameB
        nameA = a.toLowerCase();    //Förvandlar namnen till små bokstäver för att undvika strul
        nameB = b.toLowerCase();
        
        return nameA.localeCompare(nameB, 'sv'); //Jämför nameA med nameB på svenska... Returnerar -1, 1 eller 0
        
    });
    
    //Gör om arrayen med namnen till en sträng separerade med ", "
    stringNames = names.join(", ");
    
    //Mata in all data i objektet
    object.minAge = ages[0];
    object.maxAge = ages[ages.length - 1];
    object.averageAge = average;
    object.names = stringNames;
    
    //Returnera den
    return object;
}

