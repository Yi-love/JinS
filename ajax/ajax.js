
/*********ajax***************/

/******
	创建XMLHttpRequest对象
*/
function createXHR () {
	if ( typeof XMLHttpRequest != 'undefined' ) {
		return new XMLHttpRequest();
	}
	else if ( typeof ActiveXObject != 'undefined' ) {//ie
		var version = [
						'MSXML2.XMLHttp6.0',
						'MSXML2.XMLHttp3.0',
						'MSXML2.XMLHttp'
		];
		for (var i = 0 ; version.length ; i++) {
			try{
				return new ActiveXObject(version[i]);
			} catch ( e ) {
				//跳过
			}
		}
	}
	else {
		throw new Error("您的系统或浏览器不支持XHR对象!");
	}
};

/****************************
		封装ajax
***/
function ajax (obj) {
	var xhr = createXHR();

	obj.url = obj.url + '?rand=' + Math.random();
	obj.data = params(obj.data);

	if ( obj.method === 'get' )
		obj.url += obj.url.indexOf('?') == -1 ?  '?' + obj.data : '&' + obj.data;//get方法带数据
	if ( obj.async === true ) {
		xhr.onreadystatechange = function () {
			if ( xhr.readyState == 4 ) {
				callback();//回调函数
			}
		}
	}

	xhr.open(obj.method , obj.url , obj.async);
	if ( obj.method === 'post' ) {
		xhr.setRequestHeader('Content-Type' , 'application/x-www-form-urlencoded');
		xhr.send(obj.data);//发送数据
	}
	else {
		xhr.send(null);
	}

	if ( obj.async === false ) {// false 同步  true 异步
		callback();
	}

	//回调函数
	function callback () {
		if ( xhr.status == 200 ) {
			obj.success(xhr.responseText);//回调传递参数
		}
		else {
			alert('获取数据错误！ 错误代码：' + xhr.status + ' , 错误信息：' + xhr.statusText);
		}
	}
};

/*******************
	名词对转换成字符串
*/
function params (data) {
	var arr = [];
	for (var i in data) {
		arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
	}
	return arr.join('&');
};


/*********************
	调用ajax
*/
addEvent (document , 'click' , function (){
	ajax({
		method : 'post',
		url : 'server.php',
		data : {
			'name' : 'lee',
			'age'  : 100
		},
		success : function (text) {
			alert(text);
		},
		async : true
	});
});














