(function () {

	/**
	 * [contains 判断数组是否包含指定目标]
	 * @param  {[type]} target [目标数组]
	 * @param  {[type]} item   [目标项]
	 * @return {[type]}        [description]
	 */
	function contains( target , item ) {
		return target.indexOf(item) > -1;
	};

	/**
	 * [removeAt 移除指定位置的元素]
	 * @param  {[type]} target [目标数组]
	 * @param  {[type]} index  [位置]
	 * @return {[type]}        [true or false]
	 */
	function removeAt(target ,index) {
		return !!target.splice(index ,1).length;
	};

	/**
	 * [remove 删除指定项]
	 * @param  {[type]} target [description]
	 * @param  {[type]} item   [description]
	 * @return {[type]}        [description]
	 */
	function remove(target , item) {
		var index = target.indexOf(item);
		if ( ~index ) {
			return removeAt(target , index);
		}
		return false;
	};
	/**
	 * [shuffle 数组洗牌]
	 * @param  {[type]} target [description]
	 * @return {[type]}        [description]
	 */
	function shuffle(target) {
		var j , x , i = target.length;
		for ( ; i > 0 ; j = parseInt(Math.random()*i) , x = target[--i] , target[i] = target[j] , target[j] = x) {};
		return target;
	};
	/**
	 * [random 返回数组中的随机数]
	 * @param  {[type]} target [description]
	 * @return {[type]}        [description]
	 */
	function random(target) {
		return target[Math.floor(Math.random()*target.length)];
	};

	/**
	 * [flatten 平坦化处理]
	 * @param  {[type]} target [description]
	 * @return {[type]}        [description]
	 */
	function flatten(target) {
		var result = [];
		target.forEach(function(item){
			if ( Array.isArray(item) ){
				result = result.concat(flatten(item));
			} else {
				result.push(item);
			}
		});
		return result;
	};

	/**
	 * [unique 数组去重操作]
	 * @param  {[type]} target [description]
	 * @return {[type]}        [description]
	 */
	function unique(target) {
		var result = [];
		loop: for ( var i = 0 , n = target.length ; i < n ; i++ ) {
			for ( var j = i+1 ; j < n ; j++ ) {
				if ( target[i] === target[j] ){
					continue loop;
				}
			}
			result.push(target[i]);
		};
		return result;
	};

	/**
	 * [compact 数组删除 null  和  undefined]
	 * @param  {[type]} target [description]
	 * @return {[type]}        [description]
	 */
	function compact(target) {
		return target.filter(function(i){
			return i != null;
		});
	};

	/**
	 * [pluck 获取每个元素的指定属性]
	 * @param  {[type]} target [description]
	 * @param  {[type]} name   [description]
	 * @return {[type]}        [description]
	 */
	function pluck(target , name) {
		var result = [] , prop;
		target.forEach(function(item){
			prop = item[name];
			if ( prop != null ){
				result.push(prop);
			}
		});
		return result;
	};

	/**
	 * [groupBy 根据指定条件进行分组]
	 * @param  {[type]} target [description]
	 * @param  {[type]} val    [description]
	 * @return {[type]}        [description]
	 */
	function groupBy(target , val) {
		var result = {};
		/*
			val 是 回调函数 ？ 执行回调  ： 获取对象属性
		 */
		var iterator = (window.$ && window.$.isFunction(val) || typeof val === 'function' ) ? val : function(obj){
			return obj[val];
		};
		target.forEach(function(value , index){
			var key = iterator(value , index);
			(result[key] || (result[key] = []) ).push(value);
		});
		return result;
	};

	/**
	 * [sortBy 根据指定条件排序]
	 * @param  {[type]}   target [description]
	 * @param  {Function} fn     [description]
	 * @param  {[type]}   scope  [description]
	 * @return {[type]}          [description]
	 */
	function sortBy(target , fn , scope) {
		var array = target.map(function(item , index){
			return {
				el : item,
				re : fn.call(scope , item , index)
			};
		}).sort(function(left , right){
			var a = left.re , b = right.re;
			return a < b ? -1 : a > b ? 1 : 0;
		});
		return pluck(array , 'el');
	};

	/**
	 * [union 获取两个数组的并集]
	 * @param  {[type]} target [description]
	 * @param  {[type]} array  [description]
	 * @return {[type]}        [description]
	 */
	function union(target , array) {
		return unique(target.concat(array));
	};

	/**
	 * [intersect  取交集]
	 * @param  {[type]} target [description]
	 * @param  {[type]} array  [description]
	 * @return {[type]}        [description]
	 */
	function intersect(target , array) {
		return target.filter(function(i){
			return ~array.indexOf(i);
		});
	};

	/**
	 * [diff 取补集]
	 * @param  {[type]} target [description]
	 * @param  {[type]} array  [description]
	 * @return {[type]}        [description]
	 */
	function diff(target , array) {
		var result = target.slice();
		for ( var i = 0 , n = result.length ; i < n ; i ++ ){
			for ( var j = 0 , len = array.length ; j < len ; j++ ) {
				if ( result[i] === array[j] ) {
					result.splice(i , 1);
					i--;
					break;
				}
			}
		}
		return result;
	};

	/**
	 * [min 返回数组中的最小值]
	 * @param  {[type]} target [description]
	 * @return {[type]}        [description]
	 */
	function min(target) {
		return Math.min.apply(0 , target);
	};

	/**
	 * [max 返回数组中的最大值]
	 * @param  {[type]} target [description]
	 * @return {[type]}        [description]
	 */
	function max(target) {
		return Math.max.apply(0 , target);
	};

	//测试
	function fntest () {
		var a1 = [1 , 2 , 3 , 4 , 5 , 6] ,
			a2 = [22 , 21 , 45 , 56, 5 , 21 , 45 , 23];
		console.log('========================分割线===============================');
		console.log('contains' , contains(a1 , 5));
		console.log('removeAt' , removeAt(a1 , 5));
		console.log('remove' , remove(a1 , 1));
		var sc = [1 , 3 , 5 , 6];
		console.log(sc);
		console.log('shuffle' , shuffle(sc));
		console.log('random' , random(a2));
		a1 = [1 , 2 , 3 , 4 , 6 , 8, 3 ,[5 , 6 , [8 , 7] , 67 , [] , ], 'a'];
		console.log('flatten' , a1 , flatten(a1));
		console.log('unique' , a2 , unique(a2));
		a1 = [1 , , null ,34 , '' , undefined, 'undefined' , 3];
		console.log('compact' , a1 , compact(a1));
		var c = [{name:'a'} ,{name:'b' , sex:0} , {name:0}];
		console.log('pluck' , c , pluck(c , 'name'));

		var obj1 = [
					{name : '张三' , scource: 90},
					{name : '李四' , scource: 60},
					{name : '王五' , scource: 80},
					{name : 'SB' , scource: 0},
			];
		console.log('groupBy' , groupBy(obj1 , function(i){return i.scource > 60;}));
		var obj2 = [
			  { name: 'Edward', value: 21 },
			  { name: 'Sharpe', value: 37 },
			  { name: 'And', value: 45 },
			  { name: 'The', value: -12 },
			  { name: 'Magnetic' },
			  { name: 'Zeros', value: 37 }
			];
		console.log('sortBy' , sortBy(obj2 , function(a){ return a.name;}));
		console.log('union' , a1 , '+' ,a2 , '=' , union(a1 , a2));
		console.log('intersect' , a1 , 'x' ,a2 , '=' , intersect(a1 , a2));

		var cc =[1 , 2 , 2, 3 , 6 , 7 , 5 , 3 , 4 , 5];
		var cc2 = [1 ,3 , 4 ,2];
		console.log('diff' , cc , '-' , cc2 , '=' , diff(cc , cc2));

		console.log('min max ' , cc , min(cc) , max(cc));
	};

	fntest();

}).call(this);