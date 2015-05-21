

/***********正则*********************/

var box = new RegExp("Box");
alert(box);
/*
	i:   忽略大小写
	g:   全局变量
	m:   多行匹配
*/
var box = new RegExp("Box" , "gi");
alert(box);

var box = /Box/;//字面量方式的正则表达式
alert(box);

var box = /Box/gi;
alert(box);


/********测试*****************/

var pattern = new RegExp("box");
var str = "box";
alert(pattern.test(str));

var pattern = /Box/;
var str = "box";
alert(pattern.test(str));

var pattern = /Box/i;
var str = "this is box";
alert(typeof pattern.exec(str));//没有匹配到返回null








/*********************************
match:  匹配
search:  查找
replace:  替换
split: 拆分
****/

var pattern = /Box/ig;
var str = "this is box! this is box";
alert(str.match(pattern));//返回匹配字符串

alert(str.search(pattern));//返回第一个就返回，否则：-1

alert(str.replace(pattern , "Tom"));

alert(str.split(pattern));
