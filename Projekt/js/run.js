"use strict"
var init = {
	run: function(){

		var menybar = document.getElementById('menybar');

		var link = document.createElement('a');
		var icon = document.createElement('img');

		//icon editing
		icon.setAttribute("src", "pics/imageViewerIcon.png");
		icon.setAttribute("alt", "Se bilder");

		//link editing
		link.addEventListener("click", function(e){
			init.openWindow(e);
			return false;
		});
		link.setAttribute("href", "#");

		link.appendChild(icon);
		menybar.appendChild(link);

	},

	openWindow: function(e){
		//create window

		var window_  = document.createElement('div');
		var exitLink = document.createElement('a');
	},
}
