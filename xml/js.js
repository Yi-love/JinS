
/*********xml*******************/

/*******************
*
*获取读取文档方式
*
*/
	var xmlDoc;
	function loadXMLDoc(dname) {
		//Internet Explorer
		try{
		  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		}catch(e){
			//Firefox, Mozilla, Opera, etc.
			try{
		    	xmlDoc=document.implementation.createDocument("","",null);
		  	}catch(e) {alert(e.message)}
		}
		try{
		  	xmlDoc.async=false;// false 同步  true 异步
		  	xmlDoc.load(dname);
		  	return(xmlDoc);
		}catch(e) {
			var parser=new DOMParser();
			var str = '<country name="中国"><province name="安徽"><city name="安庆">桐城|枞阳|怀宁|潜山|宿松|岳西|迎江|大观|宜秀</city><city name="蚌埠">蚌山|龙子湖|禹会|淮上|怀远|固镇|五河</city><city name="毫州">利辛|蒙城|涡阳|谯城</city></province></country>';
      		return xmlDoc = parser.parseFromString(str,"text/xml");
		}
		return (null);
	}

/***********************
*加载文档
*/
	xmlDoc = loadXMLDoc("location.xml");
	document.write(xmlDoc);