// 定数
var YOU = {
	name: "you",
	image: "you@2x.png",
	record: 16,
	top: 4
};

var CHILD = {
	name: "child",
	image: "child@2x.png",
	record: 17,
	top: 81
};

var BOLT = {
	name: "bolt",
	image: "bolt@2x.png",
	record: 9.58,
	top: 151
};

var CHEETAH = {
	name: "cheetah",
	image: "cheetah@2x.png",
	record: 3,
	top: 222
}

var TYPHOON = {
	name: "typhoon",
	image: "typhoon@2x.png",
	record: 4,
	top: 293
}

var CAR = {
	name: "car",
	image: "car@2x.png",
	record: 7.2,
	top: 363
}

var HORSE = {
	name: "horse",
	image: "horse@2x.png",
	record: 7.5,
	top: 434
}

var IMAGE_DIR = 'images/';

var ANIMALS = [YOU, CHILD, BOLT, CHEETAH, TYPHOON, CAR, HORSE];
var HEIGHT = 544;
var ICON_HEIGHT = 90;
var ICON_WIDTH = 90;

function init() {

	var drawArea = d3.select('#draw_area');
	// トラック画像の追加
	drawArea.append('img')
		.attr({
			src: IMAGE_DIR + "riku.png",
			width: "100%",
			height: HEIGHT,
			id: "riku"
		})
		.style({
			position: 'absolute',
			top: 0,
			left:0	
		});
	// 追加したトラック画像の要素を取得
	var riku = document.getElementById('riku');

	// svgの追加
	var svg = drawArea.append('svg')
		.attr({
			width: riku.clientWidth,
			height: HEIGHT
    })
	.style({
		position: 'absolute',
		top: 0,
		left:0
	});

	// アイコンセット
	var startDelay = 1000;
	var height = svg.attr('height');
	var xMax = svg.attr('width');
	ANIMALS.forEach(function(animal, i){
		var y = i * (height / 7);
		var x = 0;
		svg.append('image')
			.attr({
				id: animal.name,
				href: IMAGE_DIR + animal.image,
				class: "animals",
				x: x,
				y: animal.top
			})
			.style({
				width: ICON_WIDTH,
				height: ICON_HEIGHT
			})
			.transition()
            .delay(startDelay)
            .duration(animal['record'] * 200)
            .ease('linear')
            .attr('x', xMax - ICON_WIDTH)
            .attr('stroke', 'none')
            .attr('display', 'inherited');
	});
}

init();

function start() {
	var element = document.getElementById('ownRecord');
    var ownRecord = null;
    if (element != null) {
        ownRecord = element.value;
    }
    if (ownRecord != null && ownRecord != '') {
        ANIMALS[0]['record'] = parseInt(ownRecord);
    }

	console.log(ANIMALS[0]);

    // すべての要素を削除
	d3.select('.wpd3-18850-1').select('svg').remove();
	
	// 初期化
	init();

}

function createForm() {
    var top = document.getElementById('riku').height;
    var form = d3.select("#draw_area").append("form")
        .style({
            position: 'absolute',
            top: top,
            left: 0,
        });
    form.append('label')
        .text('君の100mの速度');
    var ownRecord = form.append('input')
        .attr({
            id: 'ownRecord',
            type: 'text',
            name: 'ownRecord',
            placeholder: 15
        });
    form.append('input').attr({
        type: 'button',
        value: 'スタート'
	})
	.on('click', function(d){ start();});
}
createForm();
