var ws;

$(document).ready(function() {
	ws = new WebSocket('ws://' + window.location.host + window.location.pathname);

	ws.onmessage = function(e) {
		$("#sudoku-percent").text(e.data);
	};

	$(".sudoku-cell").on("keypress", function() {
		ws.send(JSON.stringify({
			"type": "score",
			"data": createSudokuArray()
		}));
	});
});

var createSudokuArray = function() {
	var sudokuArray = [];

	$("#sudoku-puzzle tr").each(function() {
		var sudokuRow = [];

		$(this).find("td").each(function() {
			sudokuRow.push($(this).text());
		});

		sudokuArray.push(sudokuRow);
	});

	return sudokuArray;
};
