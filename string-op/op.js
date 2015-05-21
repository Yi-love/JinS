/**
 * 字符串操作
 *Jin
 */
(function() {
	/**
	 * 获取dom元素
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	function $(name){
		return document.querySelector(name);
	};
	/**
	 * 创建节点，添加到dom
	 * @param  {[type]} target [description]
	 * @param  {[type]} name   [description]
	 * @param  {[type]} html   [description]
	 * @return {[type]}        [description]
	 */
	function createE(target , name , html){
		var el = document.createElement(name);
		el.innerHTML = html;
		target.appendChild(el);
	};
	/**
	 * 字符串重复
	 * @param  {[type]} target [description]
	 * @param  {[type]} n      [description]
	 * @return {[type]}        [description]
	 */
	function repeat(target , n) {
		var s = target ,
		    total = '';
		while(n > 0) {
			if ( n %2 == 1 ) {
				total += s;
			}
			if ( n == 1 ) {
				break;
			}
			s += s;
			n = n>>1;
		};
		return total;
	};
	/**
	 * 判断一个字符串是否包含另一个字符串
	 * @param  {[type]} target [description]
	 * @param  {[type]} it     [description]
	 * @return {[type]}        [description]
	 */
	function contains(target , it){
		return target.indexOf(it) != -1;// indexOf 改成  search ,lastIndexOf 也可以
	};

	/**
	 * 计算字符串所有字节的长度
	 * @param  {[type]} str     [description]
	 * @param  {[type]} charset [description]
	 * @return {[type]}         [description]
	 */
	function byteLen(str , charset){
		var total = 0,
			charCode,
			i,
			len;
		charset = charset ? charset.toLowerCase() : '';

		if ( charset === 'utf-16' || charset === 'utf16' ) {
			for ( i = 0 , len = str.length ; i < len ; i++ ) {
				charCode = str.charCodeAt(i);
				if ( charCode <= 0xffff ) {
					total += 2;
				} else {
					total += 4;
				}
			}
		} else {
			for ( i = 0 , len = str.length ; i < len ; i++ ) {
				charCode = str.charCodeAt(i);
				if ( charCode <= 0x007f ) {
					total += 1;
				} else if ( charCode <= 0x07ff ) {
					total += 2;
				} else if ( charCode <= 0xffff ) {
					total += 3;
				} else {
					total += 4;
				}
			}
		}
		return total;
	};

	/**
	 * 字符串截断
	 * @param  {[type]} target     [目标串]
	 * @param  {[type]} length     [截取长度]
	 * @param  {[type]} truncation [添加后缀]
	 * @return {[type]}            [description]
	 */
	function truncate(target , length ,truncation) {
		length = length || 30;
		truncation = truncation === void(0) ? '...' : truncation;
		return target.length > length ? target.slice(0 , length-truncation.length)+truncation : String(target);
	};

	/**
	 * 转或为驼峰式命名
	 * @param  {[type]} target [description]
	 * @return {[type]}        [description]
	 */
	function camelize(target) {
		if ( target.indexOf('-') < 0 && target.indexOf('_') < 0 ) {
			return target;
		}
		return target.replace(/[-_][^-_]/g , function(match){
			return match.charAt(1).toUpperCase();
		});
	};

	/**
	 * 转换为下划线风格
	 * @param  {[type]} target [description]
	 * @return {[type]}        [description]
	 */
	function underscored(target) {
		return target.replace(/([a-z\d])([A-Z])/g , '$1_$2').
				replace(/\-/g , '_').toLowerCase();
	};
	/**
	 * 转换为连续字符风格
	 * @param  {[type]} target [description]
	 * @return {[type]}        [description]
	 */
	function dasherize(target) {
		return underscored(target).replace(/_/g , '-');
	};
	/**
	 * 首字母大写
	 * @param  {[type]} target [description]
	 * @return {[type]}        [description]
	 */
	function capitalize(target) {
		return target.charAt(0).toUpperCase()+target.substring(1).toLowerCase();
	};
	/**
	 * 移除字符串中的html标签
	 * @param  {[type]} target [description]
	 * @return {[type]}        [description]
	 */
	function stripTags(target) {
		return String(target || "").replace(/<[^>]+>/g , '');
	};
	/**
	 * 移除字符串中的所有script标签，在stripTags()前调用
	 * @param  {[type]} target [description]
	 * @return {[type]}        [description]
	 */
	function stripScripts(target) {
		//正则  i : 不分大小写  g ：全局匹配   m ： 多行匹配
		return String(target || "").replace(/<script[^>]*>([\S\s]*?)<\/script>/img , '');
	};
	/**
	 * 将字符串经过html转义得到合适在页面显示的内容
	 * @param  {[type]} target [description]
	 * @return {[type]}        [description]
	 */
	function  escapeHTML(target) {
		return target.replace(/&/g , '&amp;')
					.replace(/</g , '&lt;')
					.replace(/>/g , '&gt;')
					.replace(/"/g , '&quot;')
					.replace(/'/g , '&#39;')//ie不支持
	};

	/**
	 * 将字符串中的html实体字符还原
	 * @param  {[type]} target [description]
	 * @return {[type]}        [description]
	 */
	function unescapeHTML(target) {
		return target.replace(/&amp;/g , '&')
					.replace(/&lt;/g , '<')
					.replace(/&gt;/g , '>')
					.replace(/&quot;/g , '"')
					.replace(/&#39;/g , "'")//ie不支持
	};
	/**
	 * 将字符串安全格式化为正则表达式的源码
	 * @param  {[type]} target [description]
	 * @return {[type]}        [description]
	 */
	function escapeRegExp(target) {
		return target.replace(/([-.*+?^${}()|[\]\/\\])/g , '\\$1');
	};
	/**
	 * 在字符串前端添加字符串
	 * @param  {[type]} target [description]
	 * @param  {[type]} n      [description]
	 * @return {[type]}        [description]
	 */
	function pad(target , n) {
		// return ((1<<n).toString(2)+target).slice(-n);
		return (0..toFixed(n)+target).slice(-n); 
	};
	/**
	 * 为字符串添加wbr软换行
	 * @param  {[type]} target [description]
	 * @return {[type]}        [description]
	 */
	function wbr(target) {
		//opera 下 css添加  wbr:after{content:"\00200B"};
		return String(target)
				.replace(/(?:<[^>]+>)|(?:&#?[0-9a-z]{2,6};)|(.{1})/gi, '$&<wbr>')
				.replace(/><wbr>/g , '>');
	};
	/**
	 * format 模版
	 * @param  {[type]} str    [description]
	 * @param  {[type]} object [description]
	 * @return {[type]}        [description]
	 */
	function format(str , object) {
		var array = Array.prototype.slice.call(arguments , 1);
		return str.replace(/\\?\#{([^{}]+)\}/gm , function(match , name){
			if ( match.charAt(0) == '\\' ) {
				return match.slice(1);
			}
			var index = Number(name);
			if ( index >= 0 ) {
				return array[index];
			}
			if ( object && object[name] !== void 0 ) {
				return object[name];
			} 
			return '';
		});
	};
	/**
	 * 在字符串两端添加 "" 内部需要转义的地方转义 ， 用于接装 JSON的键名等
	 * @param  {[type]} target [description]
	 * @return {[type]}        [description]
	 */
	function quote(target) {
		return '"'
			+ target
			.replace(/\x5C/g , '\\\\')
			.replace(/"/g , '\\"')
			.replace(/\x0A/g , '\\n')
			.replace(/\x09/g , '\\t')
			.replace(/\x0D/g , '\\r')
			+'"';
	};
	/**
	 * 清除空格
	 * @param  {[type]} target [description]
	 * @return {[type]}        [description]
	 */
	function trim(target) {
		return target.replace(/^\s\s*/ , '').replace(/\s\s*$/ , '');
	};
	/**
	 * 测试
	 * @return {[type]} [description]
	 */
	function test(){
		// 字符串重复
		var rep = $('#repeat');
		var revalue = repeat(rep.innerHTML ,3);
		createE(rep , 'div' , revalue);

		// 判断一个字符串是否包含另一个字符串
		$('#contains-input').addEventListener('keyup' , function(){
			if ( contains($('#contains').innerHTML , $('#contains-input').value) ){
				$('#cont-out').innerHTML = 'true';
			} else {
				$('#cont-out').innerHTML = 'false';
			}
		}, false);
		// 计算字符串所有字节的长度
		$('#bytelen').innerHTML = byteLen($('#byteinput').innerHTML);
		// 字符串截断
		$('#truncation').innerHTML = truncate($('#truncate').innerHTML , 20 , '@@@');
		// 转或为驼峰式命名
		$('#camelizeout').innerHTML = camelize($('#camelize').innerHTML);
		//转换为下划线风格
		$('#underscoredout').innerHTML = underscored($('#underscored').innerHTML);
		//转换为连续字符风格
		$('#dasherizeout').innerHTML = dasherize($('#dasherize').innerHTML);
		//首字母大写
		$('#capitalizeout').innerHTML = capitalize($('#capitalize').innerHTML);
		//移除字符串中的html标签
		$('#striptagsout').innerHTML = stripTags($('#striptags').innerHTML);
		//移除字符串中的所有script标签，在stripTags()前调用
		$('#stripscriptsout').innerHTML = stripScripts($('#stripscripts').innerHTML);
		//将字符串经过html转义得到合适在页面显示的内容
		$('#escapehtmlout').innerHTML = escapeHTML($('#escapehtml').innerHTML);
		console.log('将字符串经过html转义得到合适在页面显示的内容' , escapeHTML($('#escapehtml').innerHTML));
		//将字符串中的html实体字符还原
		$('#unescapehtmlout').innerHTML = unescapeHTML($('#unescapehtml').innerHTML);
		console.log('将字符串中的html实体字符还原' , unescapeHTML($('#unescapehtml').innerHTML));
		//将字符串安全格式化为正则表达式的源码
		$('#escaperegexpout').innerHTML = escapeRegExp($('#escaperegexp').innerHTML);
		//在字符串前端添加字符串
		$('#padout').innerHTML = pad($('#pad').innerHTML , 2);
		//为字符串添加wbr软换行
		$('#wbrout').innerHTML = wbr($('#wbr').innerHTML , 2);
		//format 模板
		$('#formatout').innerHTML = format('Result in #{0} , #{1} ' , 22 ,33);
		// $('#formatout').innerHTML = format('\\#{name} is a #{sex} ' , {name:'Jhon' , sex:'man'});
		// 在字符串两端添加 "" 内部需要转义的地方转义 ， 用于接装 JSON的键名等
		$('#quoteout').innerHTML = quote($('#quote').innerHTML);
		//清除空格
		$('#trimout').innerHTML = trim($('#trim').innerHTML);
	};
	test();
}).call(this);