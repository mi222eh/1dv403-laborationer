"use strict"
var init = {

	pictures: {},

	windowOpen: false,
	run: function(){

		var menybar = document.getElementById('menybar');

		var link = document.createElement('a');
		var icon = document.createElement('img');

		//icon editing
		icon.setAttribute("src", "pics/imageViewerIcon.png");
		icon.setAttribute("alt", "Se bilder");

		//link editing
		link.addEventListener("click", function(e){
			e.preventDefault();
			if (!init.windowOpen) {
				init.openWindow(e);
				init.getPictures();
			};
			
			return false;
		});
		link.setAttribute("href", "#");

		link.appendChild(icon);
		menybar.appendChild(link);

	},

	openWindow: function(e){

		//create window

		var window_  = document.createElement('div');
		var statusbar = document.createElement('div');
		var exitLink = document.createElement('a');
		var exitimage = document.createElement('img');
		var windowicon = document.createElement('img');
		var name = document.createElement('p');
		var text = document.createTextNode("Bildvisare");
		var contentDiv = document.createElement('div');
		var infoDiv = document.createElement('div')


		window_.classList.add("window");
		statusbar.classList.add("statusBar");
		exitLink.classList.add("exitLink");
		windowicon.classList.add("windowIcon");
		name.classList.add("windowIconText");
		contentDiv.classList.add("content");
		infoDiv.classList.add("info");

		windowicon.setAttribute("src", "pics/imageViewerIcon.png")

		exitimage.setAttribute("src", "pics/exitPic.png");
		exitimage.setAttribute("alt", "Stäng rutan");

		exitLink.setAttribute("href", "#");
		exitLink.addEventListener("click", function(e){
			e.preventDefault();
			window_.parentNode.removeChild(window_);
			init.windowOpen = false;
		});


		name.appendChild(text);

		exitLink.appendChild(exitimage);

		statusbar.appendChild(exitLink);
		statusbar.appendChild(name);
		statusbar.appendChild(windowicon);
		

		window_.appendChild(statusbar);
		window_.appendChild(contentDiv);
		window_.appendChild(infoDiv);

		document.getElementById('windowmanager').appendChild(window_);


		init.windowOpen = true;

	},

	loadPictures: function(pictures){
		init.pictures = pictures;

		console.log(init.pictures)
	},

	getPictures: function(){
		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = init.readServerMessage(xhr.responseText);
                    init.loadPictures(response);
                    
                }
                else{
                    console.log("läsfel, status: " + xhr.status);
                }
            }
            console.log("svar");
        };

		xhr.open("GET", "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", true);
		xhr.send(null);

		
	},

	readServerMessage: function(message){
		var result = JSON.parse(message);
		console.log(result);
		return result;
	},
}
