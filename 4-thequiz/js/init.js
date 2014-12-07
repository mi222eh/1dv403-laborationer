"use strict"

var init = {
	questionsCounter: 0,
	anwersAndTries: [],
	currentMessage: {},
	readServerMessage: function(message){
		var result = JSON.parse(message);
		console.log(result.nextURL);
		init.currentMessage = result;
		init.addQuestionToArray(result);
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
		var infoDiv = document.createElement("div");

		var question = document.createTextNode(init.currentMessage.question);
		var buttonText = document.createTextNode("Svara");
		var instruction = document.createTextNode("Skriv svaret i fältet nedan och tryck 'svara'");

		infoDiv.setAttribute("id", "information");
		input.setAttribute("type", "text");
		input.setAttribute("id", "answer");
		answerButton.addEventListener("click", function(){
			init.sendAnswer();
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
		area.appendChild(infoDiv);


	},

	sendAnswer: function () {
		var input = {};
		input.answer = document.getElementById("answer").value;

		var xhrPost = new XMLHttpRequest();

		xhrPost.onreadystatechange = function(){
            if (xhrPost.readyState === 4) {
                if (xhrPost.status === 200) {
                    console.log(xhrPost.responseText);
                    init.anwersAndTries[init.questionsCounter].answer = input.answer;
                    init.rightAnswer(xhrPost.responseText);
                    
                    
                }
                else if (xhrPost.status === 400) {
                	init.wrongAnswer();
                }
                else{
                    console.log("läsfel, status: " + xhrPost.status);

                }
            }
		};
		console.log(input);

		xhrPost.open("POST", init.currentMessage.nextURL, true);
		xhrPost.setRequestHeader('Content-Type', 'application/json'); 
		console.log(JSON.stringify(input));
		xhrPost.send(JSON.stringify(input));
	},

	rightAnswer: function(serverMessage){
		init.addATry(init.questionsCounter);
		var serverObject = JSON.parse(serverMessage);
		console.log(init.questionsCounter)
		if (!serverObject.nextURL) {
			init.showResults();
			
	    }
        else{
        	init.questionsCounter += 1;
        	var xhrGet = new XMLHttpRequest();

			xhrGet.onreadystatechange = function(){
	            if (xhrGet.readyState === 4) {
	                if (xhrGet.status === 200) {
	                    init.readServerMessage(xhrGet.responseText);
	                    
	                }
	                else {
	                    console.log("läsfel, status: " + xhrGet.status);
	                }
	            }
	            console.log("svar");
	        }
	        xhrGet.open("GET", serverObject.nextURL, true);
	        xhrGet.send(null);
        }

        

        
	},

	wrongAnswer: function(){
		init.addATry(init.questionsCounter);
		document.getElementById("information").innerHTML = "Fel svar";
	},

	showResults: function(){
		var area = document.getElementById("quizboard");

		//--------------------------------------------------------------------------------------------------
		var table = document.createElement('table');
		var victoryText = document.createTextNode('Gratulerar! du har klarat alla ' + init.anwersAndTries.length + ' frågor!');
		var victoryDiv = document.createElement('div');

		var tablehead = document.createElement('thead');
		var row = document.createElement('tr');
		var columnQNumber = document.createElement('th');
		var columnQuestion = document.createElement('th');
		var columnAnswer = document.createElement('th');
		var columnTries = document.createElement('th');

		victoryDiv.setAttribute("class", "win");


		victoryDiv.appendChild(victoryText);
		columnQNumber.appendChild(document.createTextNode("Frågans nummer"));
		columnQuestion.appendChild(document.createTextNode("Fråga"));
		columnAnswer.appendChild(document.createTextNode("Rätt svar"));
		columnTries.appendChild(document.createTextNode("Antal försök"));

		row.appendChild(columnQNumber);
		row.appendChild(columnQuestion);
		row.appendChild(columnAnswer);
		row.appendChild(columnTries);
		tablehead.appendChild(row);
		table.appendChild(tablehead);
		//------------------------------------------------------------------------------------------
		var tablebody = document.createElement('tbody');

		for (var i = 0; i < init.anwersAndTries.length ; i += 1) {
			var questionObject = init.anwersAndTries[i];
			row = document.createElement('tr');
			columnQNumber = document.createElement('td');
			columnQuestion = document.createElement('td');
			columnAnswer = document.createElement('td');
			columnTries = document.createElement('td');

			columnQNumber.appendChild(document.createTextNode(questionObject.questionNumber));
			columnQuestion.appendChild(document.createTextNode(questionObject.question));
			columnAnswer.appendChild(document.createTextNode(questionObject.answer));
			columnTries.appendChild(document.createTextNode(questionObject.numberOfTries));

			row.appendChild(columnQNumber);
			row.appendChild(columnQuestion);
			row.appendChild(columnAnswer);
			row.appendChild(columnTries);

			tablebody.appendChild(row);
		};

		table.appendChild(tablebody);
		area.innerHTML =""
		area.appendChild(victoryDiv);
		area.appendChild(table);
	},

	addQuestionToArray: function (questionObject) {
		init.anwersAndTries[init.questionsCounter] = {};
		init.anwersAndTries[init.questionsCounter].questionNumber = init.questionsCounter + 1;
		init.anwersAndTries[init.questionsCounter].question = questionObject.question;
		init.anwersAndTries[init.questionsCounter].numberOfTries = 0;

	},

	addATry: function (index) {
		init.anwersAndTries[index].numberOfTries += 1;
	}
};