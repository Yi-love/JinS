(function(){

	/**
	 * [limit 确保 target在 n , m 之间]
	 * @param  {[type]} target [description]
	 * @param  {[type]} n      [description]
	 * @param  {[type]} m      [description]
	 * @return {[type]}        [description]
	 */
	function limit(target , m , n) {
		var a = [m , n].sort();
		if ( target < a[0] ) {
			target = a[0];
		}
		if ( target > a[1] ) {
			target = a[1];
		}
		return target;
	};

	/**
	 * [nearer 求指定点近的那个数]
	 * @param  {[type]} target [description]
	 * @param  {[type]} m      [description]
	 * @param  {[type]} n      [description]
	 * @return {[type]}        [description]
	 */
	function nearer(target , m ,n ){
		var diff1 = Math.abs(target-m),
			diff2 = Math.abs(target-n);
		return diff1 < diff2 ? m : n;
	};

	/**
	 * [toFixed 方法修正]
	 * @param  {[type]} 0.9.toFixed(0) !             [description]
	 * @return {[type]}                [description]
	 */
	if (0.9.toFixed(0) !== 1 ) {
		Number.prototype.toFixed = function(n) {
			var power = Math.pow(10 , n);
			var fixed = (Math.round(this*power)/power).toString();
			if ( n ==0 ) {
				return fixed;
			}
			if ( fixed.indexOf('.') < 0 ){
				fixed += '.';
			}
			var padding = n+1-(fixed.length-fixed.indexOf('.'));
			for ( var i = 0 ; i < padding ; i++ ) {
				fixed += '0';
			}
			return fixed;
		}
	};
}).call(this);