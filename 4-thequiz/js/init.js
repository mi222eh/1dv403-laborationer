"use strict"

var init = {
	currentMessage: {},
	readServerMessage: function(message){
		var result = JSON.parse(message);
		init.currentMessage = result;
		init.renderPage();
	},
	renderPage: function(){
		console.log(init.currentMessage);
		var area = document.getElementById("quizboard");

		var divquestion = document.createElement("div");
		var input = document.createElement("input");
		var answerButton = document.createElement("button");
		var instructionDiv = document.createElement("div");
		var masterDiv = document.createElement("div");

		var question = document.createTextNode(init.currentMessage.question);
		var buttonText = document.createTextNode("Svara");
		var instruction = document.createTextNode("Skriv svaret i fältet nedan och tryck 'svara'");

		input.setAttribute("type", "text");
		answerButton.addEventListener("click", function(){

		});

		divquestion.appendChild(question);
		answerButton.appendChild(buttonText);
		instructionDiv.appendChild(instruction);

		area.innerHTML = "";
		masterDiv.appendChild(divquestion);
		masterDiv.appendChild(instructionDiv);
		masterDiv.appendChild(input);
		masterDiv.appendChild(answerButton);

		area.appendChild(masterDiv);


	},

	
};