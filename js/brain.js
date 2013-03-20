function answer(right) {
	var div = $('#question');
	if(right)
		div.fadeOut(450, function() { ask(); });
	else
		div.effect("shake", { times: 3 }, 350);
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getQA(count) {
	var result = {};
	result.question = data[getRandomInt(0, data.length - 1)];
	result.question.right = true;
	result.answers = [];
	
	while(result.answers.length < count - 1) {
		var answer = data[getRandomInt(0, data.length - 1)];
		
		if(answer.country != result.question.country && result.answers.indexOf(answer) == -1) {
			answer.right = false;
			result.answers.push(answer);
		}
	}
	
	var rightIndex = getRandomInt(0, count - 1);
	result.answers.splice(rightIndex, 0, result.question);
	
	return result;
}

function ask() {
	var qa = getQA(7);

	var div = $('#question');

	div.empty();

	div.append('<h1>' + qa.question.country + '</h1>');

	qa.answers.forEach(function(i) {
		div.append('<div onclick="answer(' + i.right + ')">' + i.capital + '</div>');
	});

	div.fadeIn();
}