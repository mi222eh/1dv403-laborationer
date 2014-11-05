"use strict";

window.onload = function(){

	// I denna funktion ska du skriva koden för att hantera "spelet"
	var convertString = function(str){
		// Plats för förändring.		
		// Returnera den konverterade strängen.
		// Vid fel, kasta ett undantag med ett meddelande till användaren. 

			if (str.trim() === ""){
				throw "Varning: du har inte skrivit något"; //Om man tar bort alla mellanslag och slutar med inget, kasta undantag
			}
			

		
		var tempHolder;
		var returnString = "";

		for (var i = 0; i < str.length; i += 1){
			tempHolder = str.charAt(i) //Lagra tecken
			
			if (tempHolder == 'a' || tempHolder == 'A') {
				
				returnString = returnString + "#"; //Om det är ett a, lägg nästa tecken som #
				continue;
			}
			
			if (tempHolder == tempHolder.toUpperCase()){
				returnString = returnString + tempHolder.toLowerCase(); // Om det är en stor bokstav, gör den till en liten bokstav
				
			}
			
			else if (tempHolder == tempHolder.toLowerCase()) {
				returnString = returnString + tempHolder.toUpperCase(); //Om det är en liten bokstav, för den till en stor bokstav
			}
			else {
				returnString = returnString + tempHolder; // Annars, lägg till tecknet i strängen
			}
		}
		
		return returnString;






	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = convertString(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error;
		}
	
	});



};