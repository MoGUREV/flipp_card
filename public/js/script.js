function flip(curr){


	if(curr == prev){
		return;
	}
	var cl = $(curr).attr("class");
	var ar = cl.split(" ");
	ar.forEach(function(item, i, ar){
		if(item == "false"){
			ret = true;
		}
	});
	if(ret == true) {
		ret = false;
		return;
	}
	else {
		$(curr).toggleClass('flipped');
	}

	if(prev != null){
		var cola = $(prev).children("div.back").css("background");
		var cols = $(curr).children("div.back").css("background");
		if(cola == cols) {
			$(prev).addClass('false');
			$(curr).addClass('false');
		}
		else {
			setTimeout(delay, 1000, curr, prev);
		}
		prev = null;
		return;
	}
	prev = curr;
}

function delay(elem, atom){
	$(elem).toggleClass('flipped');
	$(atom).toggleClass('flipped');
}


$(document).ready(function(){


	$('#slider').on("change", function() {
		var num = $(this).val();
		$("#count").text(num.toString());
	});


});

var prev = null;
var cardsGlobal = 0;
var tokenCards = [];
var i = 0;
var ret = false;



function start() {
	var cardsNum = $("#slider").val();
	cardsNum = parseInt(cardsNum);
	$(".container").html("");
	cardsGlobal = cardsNum;
	var colorPick = [];
	for (var i = 0; i < cardsNum; i+=2) { //i=0
		var color = getRandomColor();
		colorPick[i] = color;
		colorPick[i+1] = color;
	}
	var colorStack = colorPick.shuffle();
	createCards(cardsNum, colorStack);
}

function createCards(cardsNum, colorStack) {

	for(var i = 0; i < cardsNum; i++){
		var section = document.createElement('section');
		section.className = "flipper";
		section.innerHTML = "<div class='card' onclick='flip(this)'><div class='front'></div><div class='back' style='background: " + colorStack[i] + "'></div></div>";
		$(".container").append(section);
		if(((i+1) == cardsNum/2) && (cardsNum == 4)){
			$(".container").append("<br>");
		}
		if((i+1)%4 == 0){
			$(".container").append("<br>");
		}
	}
	$(".container").css("display", "block");
}

function getRandomColor() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

Array.prototype.shuffle = function( b )
{
	var i = this.length, j, t;
	while( i ) 
	{
		j = Math.floor( ( i-- ) * Math.random() );
		t = b && typeof this[i].shuffle!=='undefined' ? this[i].shuffle() : this[i];
		this[i] = this[j];
		this[j] = t;
	}
	return this;
};
