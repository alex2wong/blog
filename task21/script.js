/*
	关于对输入的拆分、加入数组的函数
*/
(function(){
	var inter = function(){};
	var n = 11;
})()

// 事件绑定兼容
function addEventHandler(ele,evt,handler){
	if (ele.addEventListener){
		ele.addEventListener(evt,handler,false);
	} else if (ele.attachEvent){
		ele.attachEvent("on" + evt, handler);
	} else {
		ele["on" + evt] = handler;
	}
}

var tagInput = document.getElementById('inputtags'),
	interInput = document.getElementById('inputerest'),
	tags = document.getElementById('tags'),
	interests = document.getElementById('interests'),
	interconfirm = document.getElementById('comfirm');

// 实例化对象
var tagObj = new Queue(tags),
	interestObj = new Queue(interests);

// 构造函数和原型，混合模式
function Queue(divlist){
	this.queue = [];
	this.render = function(){
		var inhtml = "";
		for (var i = 0; i < this.queue.length; i++) {
			inhtml += "<span >" + this.queue[i] + "</span>";
		}
		divlist.innerHTML = inhtml;
	}
}

Queue.prototype.rightPush = function(str){
	this.queue.push(str);
	this.render();
}
Queue.prototype.leftShift = function(){
	this.queue.shift();
	this.render();
}

window.onload = function(){
	// 完成事件绑定
	addEventHandler(tagInput,'keyup',showTag);
	addEventHandler(tagInput,'keyup',showkeyCode);
}

function showkeyCode(evt){
	console.log(evt.keyCode);
}

function showTag(evt){
	// 正则？？如果包含以下符号则 压入队列，如果超过10个就出队一个。渲染。
	// /s 等效于[/n/r/t/f/x0B] 空白字符。 /d [0-9] /D[^0-9] + 至少一次 ？0或者1次
	if (/[,，;；/s]+/.test(tagInput.value) || evt.keyCode == 13){
		var data = splitInput(tagInput.value),
			newTag = data[0];
		if (tagObj.queue.indexOf(newTag) == -1){
			tagObj.rightPush(newTag);
			if (tagObj.queue.length > 10){
				tagObj.leftShift();
			}
		}
		tagObj.render();
		tagInput.value = "";
	}
}

// 通用的分割函数
function splitInput(str) {
	var inputArray = str.trim().split(/[,，;；/s]/);
	return inputArray;
}