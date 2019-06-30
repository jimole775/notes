// 在浏览器端输出一个xml类型的数据：
function stringToXML(xmlData) {
   if (window.ActiveXObject) {
      //for IE
      xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async="false";
      xmlDoc.loadXML(xmlData);
      return xmlDoc;
   }
   else if (document.implementation && document.implementation.createDocument) {
      //for Mozila
      parser=new DOMParser();
      xmlDoc=parser.parseFromString(xmlData,"text/xml"); //当然"text/html"，就是创建一个html类型
      return xmlDoc;
   }
}

var xmlObj = stringToXML(
            ['<?xml version="1.0" encoding="utf-8"?>',
                '<msg>',
                '<list  lrc_url="ting.lrc" >',
                '<u u="ting.mp3" />',
                '</list>',
             '</msg>'].join('')
        );