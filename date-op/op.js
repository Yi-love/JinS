(function(){

	/**
	 * [getYear setYear  ie 6 7 修正]
	 * @param  {[type]} (new Date).getYear() > 1900 [description]
	 * @return {[type]}      [description]
	 */
	if ( (new Date).getYear() > 1900 ) {
		Date.prototype.getYear = function(){
			return this.getFullYear - 1900;
		};
		Date.prototype.setYear = function(y){
			return this.setFullYear(y);
		};
	};
}).call(this);