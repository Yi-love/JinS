(function(){
	/**
	 * [bind 劫持作用域 添加参数]
	 * @param  {[type]} context [description]
	 * @return {[type]}         [description]
	 */
	Function.prototype.bind = function(context) {
		if ( arguments.length < 2 && context == void(0) ) {
			return this;
		}
		var __method = this , args = [].slice.call(arguments , 1);
		return function(){
			return __method.apply(context ,args.concat.apply(args , arguments));
		};
	};

	/**
	 * [addEvent 事件添加兼容修正  this对象]
	 * @type {[type]}
	 */
	var addEvent = document.addEventListener ? 
		function (target , type , fn , capture){
			target.addEventListener(type , fn , capture);
		} :
		function ( target , type , fn){
			target.attachEvent('on'+type , fn.bind(target , event));
		};

	/**
	 * [bind call apply 变种合并]
	 * @param  {[type]} bind [description]
	 * @return {[type]}      [description]
	 */
	var bind = function(bind) {
		return {
			bind : bind.bind(bind),
			call : bind.bind(bind.call),
			apply : bind.bind(bind.apply)
		}
	}(Function.prototype.bind);

	/**
	 * [apply 修复]
	 * @param  {[type]} x       [description]
	 * @param  {[type]} y){		x [description]
	 * @param  {[type]} j       [description]
	 * @return {[type]}         [description]
	 */
	Function.prototype.apply || (Function.prototype.apply = function(x , y){
		x = x || window;
		y = y || [];
		x.__applay = this;
		if ( !x.__applay ) {
			x.constructor.prototype.__applay = this;
		}
		var r , j = y.length;
		switch(j){
			case 0: x.__applay(); break;
			case 1: x.__applay(y[0]) ; break;
			case 2: x.__applay(y[0] , y[1]) ; break;
			case 3: x.__applay(y[0] , y[1] , y[2]) ; break;
			case 4: x.__applay(y[0] , y[1] , y[2] , y[3]) ; break;
			default :
				var a = [];
				for ( var i = 0 ; i < j ; ++i ) {
					a[i] = 'y['+i+']';
				}
				r = eval('x.__applay('+a.join(',')+')');
				break;
		}
		try{
			delete x.__applay ? x.__applay : x.constructor.prototype.__applay;
		}catch(e){};
		return r;
	});

	/**
	 * [call 函数修复]
	 * @param  {[type]} ){		var a             [description]
	 * @return {[type]}          [description]
	 */
	Function.prototype.call || (Function.prototype.call = function(){
		var a = arguments , x = a[0] , y = [];
		for ( var i = 1 , j < a.length ; i < j ; ++i ){
			y[i-1]= a[i];
		}
		return this.apply(x , y);
	});

}).call(this);






