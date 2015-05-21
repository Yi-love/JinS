
/************
	对象式

var Base = {
	getId : function (id) {
		return document.getElementById(id)
	},
	getName : function (name) {
		return document.getElementsByName(name)
	},
	getTagName : function (tag) {
		return document.getElementsByTagName(tag);
	}
};
*/
var $ = function () {
	return new Base();
};

function Base() {
	/*******
		创建一个数组保存获取的节点
	*/
	this.elements = [];
};

/*****
	根据ID获取节点
*/
Base.prototype.getId = function (id) {
	this.elements.push(document.getElementById(id));
	return this;
};
/***********
	根据Name获取节点
*/
Base.prototype.getName = function (name) {
	this.elements.push(document.getElementsByName(name));
	return this;
};
/**************
	根据TagName获取节点
*/
Base.prototype.getTagName = function (tag) {
	var tags = document.getElementsByTagName(tag);
	for ( var i = 0 ; i < tags.length ; i++ ) {
		this.elements.push(tags[i]);
	};	
	return this;
};
/**************
	根据ClassName获取节点
*/
Base.prototype.getClass = function (className , idName) {
	var node = null;
	if ( arguments == 2 ) {
		node = document.getElementById(idName);
	}
	else {
		node = document;
	}
	var all = node.getElementsByTagName('*');
	for ( var i = 0 ; i < all.length ; i++ ) {
		if ( all[i].className == className ) {
			this.elements.push(all[i]);
		}
	};	
	return this;
};

/**************
	添加class属性
*/
Base.prototype.addClass = function (className) {
	for ( var i = 0 ; i < this.elements.length ; i++ ) {
		if ( !this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)')) ) {
			this.elements[i].className += ' '+className; 
		}
	};	
	return this;
};

/**************
	删除class属性
*/
Base.prototype.removeClass = function (className) {
	for ( var i = 0 ; i < this.elements.length ; i++ ) {
		if ( this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)')) ) {
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)' , ' '));
		}
	};	
	return this;
};
/***************
	选择指定元素
*/
Base.prototype.getElement = function (num) {
	if ( num < 0 || num >= this.elements.length )
		return this;
	var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;

	return this;
};
/*************
	设置或获取元素css样式
*/
Base.prototype.css = function (attr , value) {
	for (var i = this.elements.length - 1; i >= 0; i--) {
		if ( arguments.length == 1) {
			if ( typeof window.getComputedStyle != 'undefined') {//w3c
				return window.getComputedStyle(this.elements[i] , null)[attr];
			}
			else if ( typeof this.elements[i].currentStyle != 'undefined' ) {//ie
				return this.elements[i].currentStyle[attr];
			}
		}
		else if (arguments.length == 2){
			this.elements[i].style[attr] = value;
		}
	};
	return this;
}

/********************
	添加css
*/
Base.prototype.addRule = function(num , selectorText , cssText , position) {
	var sheet = document.styleSheets[num];
	if ( typeof sheet.insertRule != 'undefined') {
		sheet.insertRule(selectorText + '{' +cssText + '}' , position)
	}
	else if (typeof sheet.addRule != 'undefined') {
		sheet.addRule(selectorText , cssText , position);
	}
	return this;
}
/*************
	删除css
*/
Base.prototype.removeRule = function (num, index) {
	var sheet = document.styleSheets[num];
	if (typeof sheet.deleteRule != 'undefined') {//W3C
		sheet.deleteRule(index);
	} 
	else if (typeof sheet.removeRule != 'undefined') {//IE
		sheet.removeRule(index);
	}
	return this;
}

/*************
	设置元素文本innerHTML
*/
Base.prototype.html = function (str) {
	for (var i = this.elements.length - 1; i >= 0; i--) {
		this.elements[i].innerHTML = str;
	};
	return this;
}

/**********
	添加click事件
*/
Base.prototype.click = function (fn) {
	for (var i = this.elements.length - 1; i >= 0; i--) {
		this.elements[i].onclick = fn;
	};
	return this;
}