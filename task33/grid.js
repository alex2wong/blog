/* require utils.js */

$ = function(ele){
	return document.querySelector(ele);
}

var rows = document.querySelectorAll('.rows');
for (var i = 0; i < rows.length; i++) {
	rows[i].firstElementChild.innerText = i+1;
}

var tdarr = [];
var loc = [3,5];
var n = 0;

function Robot(name){
	this.name = name;
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
	if (this.rotation/90 == 0){
		nloc.push(this.loc[0]);
		nloc.push(this.loc[1]-1);
	} else if (this.rotation/90 == 1){
		nloc.push(this.loc[1]);
		nloc.push(this.loc[0] + 1);
	} else if (this.rotation/90 == 2){
		nloc.push(this.loc[0]);
		nloc.push(this.loc[1] + 1);
	} else if (this.rotation/90 == 3){
		nloc.push(this.loc[1]);
		nloc.push(this.loc[0]-1);
	}
	// 通过[x, y] 找到td
	renderRob(getTd(nloc), this);
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
	// 修改rob所在td的样式
	renderRob(getTd(this.loc), this);
}

Robot.prototype.right = function(){
	this.rotation += 90;
	if (this.rotation >360){
		this.rotation -= 360;
	}
	console.log(this.rotation);
	// 修改rob所在td的样式
	renderRob(getTd(this.loc), this);
}

/* 输入坐标或者td渲染Robot */
function renderRob(td, rob){
	td.setAttribute('class', 'active');
	td.style.transform = 'rotate('+ rob.rotation +'deg)';
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
	var td;
	return tdarr[loc[0]][loc[1]];
}

window.onload = function(){
	/* 初始化一个机器人 */
	
	/*setTimeout(function(){
		renderRob(rob.loc);
	}, 1000);*/

	var target, hasRob = 0, rob;
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
		if (evt.keyCode == 65){
			rob.left();
		} else if (evt.keyCode == 68){
			rob.right();
		} else if (evt.keyCode == 87){
			rob.go();
		}
	});
}