
var	colors= [
	"#fc00d3",
	"#ab00fc",
	"#fc005b",
	"#008dfc",
	"#00fc8d",
	"#fcd400",
	"#fc6500",
	"#fcb500",
	"#fc00d3",
	"#ab00fc",
	"#fc005b",
	"#008dfc",
	"#00fc8d",
	"#fcd400",
	"#fc6500",
	"#fcb500",
	];

var loops = 10;
var $header = $("<h1>")

function nameColorizer(name){
	$header.empty();
	
	var lettersArray = name.split("");

	for (i=0;i<lettersArray.length;i++) {
		var $letter = $("<span>").text(lettersArray[i]);
		var index = Math.floor(Math.random()*colors.length);
		var coloredLetter = $letter.css({color:colors[index]});
		$header.append(coloredLetter)
		$("#name").append($header)
	};
};


var timer = setInterval(function(){

	if(loops>0){
        nameColorizer("Michelle Didier");
        loops--;
    }else{
    	clearInterval(timer);
    };
}, 250);


