
//creating file object
 var fs = require("fs");
 //reading a  CSV file
 var data = fs.readFileSync('Indicators.csv');
 //Changing data to string
 var stringData=data.toString();
 //splitting data into row
 var arrayOne= stringData.split('\r\n');
 //Splitting data of header using comma
 var header=arrayOne[0].split(',');
//Separating the data when data contains comma
 var csv2array = require('csv2array');
 //For finding the index of particular column (dynamic aproch)
 var cnt_cn,cnt_in,cnt_year,cnt_value;
 cnt_cn = header.indexOf('CountryName');
 cnt_in = header.indexOf('IndicatorName');
 cnt_year = header.indexOf('Year');
 cnt_value = header.indexOf('Value');
 var noOfRow = arrayOne.length;
 //creating required array and object
 var jArray=[];
 var top=[];
 var obj={};
 //loop that runs for adding the values of all  countries
  for (i = 1; i < noOfRow-1; i++) {
    var myNewLine=csv2array(arrayOne[i])[0];
    if(obj[myNewLine[cnt_cn]]==undefined) {
      obj[myNewLine[cnt_cn]]=0;
    }
    //checking required condition
    if((myNewLine[cnt_in]=='Life expectancy at birth, total (years)') && (myNewLine[cnt_year]>='1960') && (myNewLine[cnt_year]<='1980' )) {
 obj[myNewLine[cnt_cn]]+=parseFloat(myNewLine[cnt_value]);
    }
 };
 /*var obj = {
    name: "Simon",
    age: "20",
    clothing: {
        style: "simple",
        isDouche: false
    }
 }*/
 //seperating the key and value of an ojbect and pushing them ibnto an array
 for(var propt in obj){
     var object = {}
    object["Country"]=propt;
   object["Value"]=obj[propt]/21;
   jArray.push(object);
   //console.log(x,y);
   }
 jArray.sort(function(a,b) {
      return b['Value']-a['Value'];
 });
 for(i=0;i<5;i++){
   top[i]=jArray[i];
 }
 //displaying the values
 console.log(top);
 //Writing a file
 var file = 'top2.json';
 //printing final object
 var obj = JSON.stringify(top);
 fs.writeFileSync(file, obj);
