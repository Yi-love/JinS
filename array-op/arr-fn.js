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
			for ( var x = i+1 ; i < n ; x++ ) {
				if ( target[i] === target[x] ){
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

	//测试
	function fntest () {
		var a1 = [1 , 2 , 3 , 4 , 5 , 6] ,
			a2 = [22 , 21 , 45 , 56, 5];
		console.log('========================分割线===============================');
		console.log('contains' , contains(a1 , 5));
		console.log('removeAt' , removeAt(a1 , 5));
		console.log('remove' , remove(a1 , 1));
		var sc = [1 , 3 , 5 , 6];
		console.log(sc);
		console.log('shuffle' , shuffle(sc));
		console.log('random' , random(a2));
	};

	fntest();

}).call(this);