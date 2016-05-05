/* require utils.js */

$ = function(ele){
	return document.querySelector(ele);
}

var rows = document.querySelectorAll('.rows');
for (var i = 0; i < rows.length; i++) {
	rows[i].firstElementChild.innerText = i+1;
}

// 所有的全局变量
var target, hasRob = 0, rob;
var tdarr = [];
var loc = [3,5];
var n = 0;

function Robot(name){
	this.name = name;
	this.preloc = [3,5];
	this.loc = [3,5];
	this.rotation = 0;
}

Robot.prototype.move = function(loc){
	// 通过索引查找到 td
	var td;
	renderRob(td, this);
}

Robot.prototype.go = function(){
	var nloc = [];
	if (this.rotation/90 == 0 || this.rotation/90 == 4){
		nloc.push(this.loc[0]);
		nloc.push(this.loc[1]-1);
	} else if (this.rotation/90 == 1){		
		nloc.push(this.loc[0] + 1);
		nloc.push(this.loc[1]);
	} else if (this.rotation/90 == 2){
		nloc.push(this.loc[0]);
		nloc.push(this.loc[1] + 1);
	} else if (this.rotation/90 == 3){		
		nloc.push(this.loc[0]-1);
		nloc.push(this.loc[1]);
	}
	// 记录上一步的位置
	this.preloc = this.loc;
	this.loc = nloc;
	// 通过[x, y] 找到td
	renderRob(getTd(this.loc), this);
}

Robot.prototype.back = function(){
	var nloc = [];
	if (this.rotation/90 == 0 || this.rotation/90 == 4){
		nloc.push(this.loc[0]);
		nloc.push(this.loc[1] + 1);
	} else if (this.rotation/90 == 1){		
		nloc.push(this.loc[0] - 1);
		nloc.push(this.loc[1]);
	} else if (this.rotation/90 == 2){
		nloc.push(this.loc[0]);
		nloc.push(this.loc[1] - 1);
	} else if (this.rotation/90 == 3){		
		nloc.push(this.loc[0] + 1);
		nloc.push(this.loc[1]);
	}
	// 记录上一步的位置
	this.preloc = this.loc;
	this.loc = nloc;
	// 通过[x, y] 找到td
	renderRob(getTd(this.loc), this);
}

Robot.prototype.landing = function(table){
	
}

/* 把机器人角度控制在0~360 */
Robot.prototype.left = function(){
	this.rotation -= 90;
	if (this.rotation < 0){
		this.rotation += 360;
	}
	console.log(this.rotation);
	this.preloc = this.loc;
	// 修改rob所在td的样式
	renderRob(getTd(this.loc), this);
}

Robot.prototype.right = function(){
	this.rotation += 90;
	if (this.rotation >360){
		this.rotation -= 360;
	}
	console.log(this.rotation);
	this.preloc = this.loc;
	// 修改rob所在td的样式
	renderRob(getTd(this.loc), this);
}

/* 输入Robot下一步所在的td，渲染。并且删除原来位置的样式 */
function renderRob(td, rob){
	if (!td){
		console.log('撞墙啦！');
		return;
	}
	var oldtd = getTd(rob.preloc);
	var log = $('#log');
	/*// 仅为转向，则做动画效果..否则删除原div，在新位置增加div.
	if (rob.preloc.toString() == rob.loc.toString()){
		if (oldtd.firstElementChild){
			oldtd.firstElementChild.style.transform = 'rotate('+ rob.rotation +'deg)';
		}
	} else {*/
		if (oldtd.firstElementChild){
			oldtd.removeChild(oldtd.firstElementChild);
		}
		
		var robdiv = document.createElement('div');
		td.appendChild(robdiv);
		robdiv.setAttribute('class', 'active');
		robdiv.style.transform = 'rotate('+ rob.rotation +'deg)';
	//}

	log.value += 'preloc: '+rob.preloc.toString() +', '+'loc: '+rob.loc +', '+ 'angle: '+rob.rotation+'\n';
	log.scrollTop =  log.scrollHeight;
}

(function(){
	var rows = $('tbody').children, tds;
	for (var i = 0; i < rows.length; i++) {
		tds = rows[i].children;
		tdarr[i] = [];
		for (var j = 0; j < tds.length; j++) {
			tdarr[i].push(tds[j]);
		}
	}
})();

/* [x, y] 转换 td 的函数 */
function getTd(loc){
	var td = null;
	try{
		td = tdarr[loc[1]][loc[0]];
	}
	catch(e){
		console.log(e);
	}
	return td;
}



/* 初始化一个机器人 */

/*setTimeout(function(){
	renderRob(rob.loc);
}, 1000);*/

/* 添加鼠标事件，点击td生成机器人，显示其位置 */
$('tbody').onclick = function(evt){
	if (hasRob == 1){ return }
	target = evt.srcElement || evt.target;
	if (target.tagName == "TD"){
		rob = new Robot('alex');
		renderRob(getTd(rob.loc), rob);
		hasRob = 1;
	}
}

utils.events.addEvent($('#cmd'), 'keyup',function(evt){
	/*console.log(evt.keyCode);*/
	if (!rob){
		return;
	}
	if (evt.keyCode == 65){
		rob.left();
	} else if (evt.keyCode == 68){
		rob.right();
	} else if (evt.keyCode == 87){
		rob.go();
	} else if (evt.keyCode == 83){
		rob.back();
	}
});

if (document.readyState == 'complete'){
	console.log('after grid.js loaded, document ready');
} else { 
	console.log('after grid.js loaded, document not ready');
}


