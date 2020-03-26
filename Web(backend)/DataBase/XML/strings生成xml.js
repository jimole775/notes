CommonTool.prototype.string2xml = function (str) {
		if (document.all) {//IE浏览器
			var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = false;
			xmlDoc.loadXML(str);
			return xmlDoc;
		}
		else {//非IE浏览器
			return new DOMParser().parseFromString(str, "text/xml");
		}
	}