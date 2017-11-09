(function(Popupbox, DefaultOpt){
	function POPUPBOX(option=DefaultOpt){
		this.options = {};
		for(let name in DefaultOpt){
			this.options[name] = option[name] || DefaultOpt[name];
		}
		this.init();
	}
	POPUPBOX.prototype.init = function(){
		var opt = this.options;
		var id = ~~(Math.random()*1000000000);
		function matchPercentage(str, pareLen, selfLen, defaultVal){
			var reg = /^(-)?\d+\.?\d*%$/;
			var r;
			if(reg.test(str)){
				r = str;
			}else if(+str === +str){
				r = str + 'px';
			}else{
				r = defaultVal;
			}
			if(r == 'center'){
				r = pareLen/2 - selfLen/2 + 'px';
			}else if(+r === +r){
				r = r + 'px';
			}
			return r;
		}
		var l = matchPercentage(String(opt.x), window.innerWidth, opt.width, DefaultOpt.x);
		var t = matchPercentage(String(opt.y), window.innerHeight, opt.height, DefaultOpt.y);
		var w = matchPercentage(String(opt.width), window.innerWidth, null, DefaultOpt.width);
		var h = matchPercentage(String(opt.height), window.innerHeight, null, DefaultOpt.height);
		var ele = '<div class="popupbox" onmousedown="boxUp2Top(event)" style="width:'+w+';height:'+h+';left:'+l+';top:'+t+'">\
					<input type="radio" name="popupbox" id="'+id+'">\
					<label for="'+id+'">\
						<div class="title" data-pressed="false" onmousedown="boxdragStart(event)">'+opt.title+'</div>\
						<div class="close" onclick="closeBox(event)"></div>\
					</label>\
				   </div>';
		document.body.innerHTML += ele;
		// 检测弹框位置，超出用户可达范围时修改位置
		limitPopupBoxPos(document.body.querySelector('.popupbox:last-child'));
	}
	window.Mouse = {
		dragStartMousePos: {
			x: null,
			y: null
		},
		dragStartTargetPos: {
			x: null,
			y: null
		},
		dragEle: null
	}
	window[Popupbox] = POPUPBOX;
})('Popupbox', {
	'width': 330,
	'height': 180,
	'x': 'center',
	'y': 'center',
	'title': null,
	'type': 'dialog' //dialog,alert,warning
});