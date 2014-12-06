"use strict";

window.onload = function(){

	
	var birthday = function(date){
		var dateTime, currentDate, userDate, tempDate, result;
		console.log(date);
		
		if (date.trim() === ""){			//Kontrollera om strängen är tom
			throw "Varning: det är tomt";
		}
		
		dateTime = date.split("-"); 		//Dela upp strängen i delar
		
		if (dateTime.length !== 3 || dateTime[0].length !== 4 || dateTime[1].length !== 2 || dateTime[2].length !== 2){
			throw "Varning: skriv i formatet ÅÅÅÅ-MM-DD"; //kastar ett undantag om formatet inte håller
		}
		
		if (isNaN(dateTime[0]) || isNaN(dateTime[1]) || isNaN(dateTime[2])){    //Kontrollerar om det innehåller nummer
			throw "Varning: skriv nummer nästa gång";
		}
		
		if(dateTime[1] > 12 || dateTime[2] > 31){
			throw "Varning: kontrollera datumet"; //...
			
		}
		tempDate = new Date();   //lagra ett temporärt datum av dagens datum
		
		currentDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());  //Sätter in år, månad, dag (hoppar över timmar, sekunder etc...)
		
		tempDate = null; 		//Tar bort (typ)
		
		userDate = new Date(currentDate.getFullYear(), dateTime[1]-1, dateTime[2]);	//Skapa date objekt utifrån strängen (månaderna är noll-indexerade)
		console.log(dateTime);
		console.log(typeof((userDate - currentDate)/(1000*60*60*24)));
		
		if ((userDate - currentDate)/(1000*60*60*24) < 0){   //Om det blir negativt...
			userDate = new Date(userDate.getFullYear()+1, userDate.getMonth(), userDate.getDate()); //... sätt födelsedagen ett år frammåt
			console.log(typeof((userDate - currentDate)/(1000*60*60*24)));
			}
			result = (userDate - currentDate)/(1000*60*60*24);
			console.log(userDate+",  " + currentDate);
		return result;  //Returnera skillnad mellan datumen i form av dagar



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
			var answer = birthday(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error;
		}
	
	});



};