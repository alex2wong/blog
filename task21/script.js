/*
	关于对输入的拆分、加入数组的函数
*/
(function(){
	var inter = function(){};
	var n = 11;
})()

function Queue(divlist){
	this.queue = [];
	this.render = function(){
		var inhtml = "";
		for (var i = 0; i < this.queue.length; i++) {
			inhtml += "<span id="+ i +">" + this.queue[i] + "</span>";
		}
		divlist.innerHTML = inhtml;
	}
}

Queue.prototype.rightPush = function(str){
	this.queue.push(str);
	this.render();
}


var que = {
	queue:[21,3,34],
	spliter: spliter
}

function spliter(argument) {
	// body...
	alert(12);
}