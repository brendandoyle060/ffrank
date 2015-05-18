

if (window.DOMParser)
  {
    parser=new DOMParser();
    xmlDoc=parser.parseFromString(txt,"text/xml");
  }
else // Internet Explorer
  {
    xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async=false;
    xmlDoc.loadXML(txt);
  }

//Gets house address number
xmlDoc.getElementsByTagName("streetNumber")[0].childNodes[0].nodeValue;

//Gets Street name
xmlDoc.getElementsByTagName("street")[0].childNodes[0].nodeValue;

//Gets Postal Code
xmlDoc.getElementsByTagName("postalcode")[0].childNodes[0].nodeValue;