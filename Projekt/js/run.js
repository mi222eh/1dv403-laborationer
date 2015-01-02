"use strict"
var init = {

	pictures: [],

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

	

	getPictures: function(){
		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function(){
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = init.readServerMessage(xhr.responseText);
                    init.loadPictures(response);
                    
                }
                else{
                    console.log("3rr0r, Zt@tus: " + xhr.status);
                }
            }
            console.log("svar");
        };

		xhr.open("GET", "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", true);
		xhr.send(null);

		init.loading(true);

		
	},

	loadPictures: function(pictures){
		init.pictures = pictures;
		console.log(init.pictures);

		var height, width;

		width = init.calcWidth();
		console.log(width);

		height = init.calcHeight();
		console.log(height);

		var area = document.getElementsByClassName("content")[0];

		for (var i = 0; i < init.pictures.length; i+=1) {
			(function(){
				var id = i;

				var picdiv = document.createElement("div");
				var div = document.createElement("a");
				var picture = document.createElement("img");

				div.style.height = height + "px";
				div.style.width = width + "px";
				div.setAttribute("href", "#");
				div.addEventListener("click", function(e){
					init.changeBackground(e, id)
				})

				picture.setAttribute("src", init.pictures[i].thumbURL);
				picture.setAttribute("alt", "bild "+ i);

				div.appendChild(picture);
				picdiv.appendChild(div);
				area.appendChild(picdiv);

				if (i === init.pictures.length - 1) {
					picture.onload = init.loading(false);
				}

			}())
		}

	},

	readServerMessage: function(message){
		var result = JSON.parse(message);
		return result;
	},

	calcWidth: function(){
		var width = 0;
		for (var i = 0; i < init.pictures.length; i+=1) {
			if (init.pictures[i].thumbWidth > width) {
				width = init.pictures[i].thumbWidth;
			};
		};
		return width;
	},

	calcHeight: function(){
		var height = 0;
		for (var i = 0; i < init.pictures.length; i+=1) {
			if (init.pictures[i].thumbHeight > height) {
				height = init.pictures[i].thumbHeight;
			};
		};
		return height;
	},

	loading: function(bool){
		var infoDiv = document.getElementsByClassName('info')[0];
		if (bool) {

			var div = document.createElement('div');
			var img = document.createElement('img');
			var loadText = document.createElement('p');
			var text = document.createTextNode("Laddar...");

			img.setAttribute("src", "pics/ajax-loader.gif");
			img.setAttribute("alt", "Laddar...");

			loadText.appendChild(text);
			div.appendChild(img);
			div.appendChild(loadText);

			infoDiv.appendChild(div);
		}
		else{
			infoDiv.removeChild(infoDiv.childNodes[0])
		}
	},

	changeBackground: function(e, id){
		console.log(id);
		e.preventDefault();
		var backgroundObject = init.pictures[id];
		var background = document.getElementById("windowmanager");
		background.style.backgroundImage = "url(" + backgroundObject.URL + ")";
		background.style.backgroundSize = backgroundObject.width + "px " + backgroundObject.height + "px";
	},
}