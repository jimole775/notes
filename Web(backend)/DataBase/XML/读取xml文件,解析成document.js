/**
* aXMLFileName是xml文件路径名
*/
function getXmlDoc(){
    try{
      if (window.ActiveXObject){
        xmlDoc= new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = false;
        isLoaded = xmlDoc.load(aXMLFileName);
      }
      else if(document.implementation&& document.implementation.createDocument){
        try{
            xmlDoc = document.implementation.createDocument('', '', null);
            xmlDoc.async = false;
            xmlDoc.load(aXMLFileName);
        } catch(e){
            var xmlhttp = new window.XMLHttpRequest();
            xmlhttp.open("GET",aXMLFileName,false); 
            xmlhttp.send(null);
            xmlDoc = xmlhttp.responseXML;
        }
      }
      else{
          alert("load data error");
      }
    }
    catch(e){  
        alert(e.message);
    }
}