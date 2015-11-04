$(document).ready(function() {
	var ws = new WebSocket('ws://' + window.location.host + window.location.pathname);

	$(".sudoku-cell").on("keypress", function() {
		console.log("Entered something");
	});

	
});