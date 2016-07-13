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
 //finding position of colums dynamically
 var index_countryname = header.indexOf('CountryName');
 var index_indicatorname = header.indexOf('IndicatorName');
 var index_year = header.indexOf('Year');
 var index_value = header.indexOf('Value');
 //Separating the data when data contains comma
 var csv2array = require('csv2array');
 var noOfRow = arrayOne.length;
 //Array of Asian Countries
 var Asian_Country = ["Arab World","East Asia & Pacific (all income levels)","East Asia & Pacific (developing only)",
 "South Asia","Afghanistan","Armenia","Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei Darussalam","Cambodia","China",
 "Georgia","Indonesia","Iran, Islamic Rep.","Iraq","Israel","Japan","Jordan","India"];
 //objects for male and female
 var obj_Female = {};
 var obj_Male = {};
 //loop that runs for adding the values of all asian countries
 for (var i = 1; i < noOfRow-1; i++) {
  var myNewLine = csv2array(arrayOne[i])[0];
  //create objects for male and female
  if(obj_Female[myNewLine[index_year]] == undefined) {
    obj_Female[myNewLine[index_year]] = 0;
  }
  if(obj_Male[myNewLine[index_year]] == undefined) {
    obj_Male[myNewLine[index_year]] = 0;
  }
  //checking the required condition
  if(Asian_Country.indexOf(myNewLine[index_countryname]) != -1 && myNewLine[index_indicatorname] == 'Life expectancy at birth, female (years)') {
   obj_Female[myNewLine[index_year]]+=parseFloat(myNewLine[index_value]);//adding value based on year for every country in the array
   }
   //checking the required condition
 if(Asian_Country.indexOf(myNewLine[index_countryname]) != -1 && myNewLine[index_indicatorname] == 'Life expectancy at birth, male (years)') {
   obj_Male[myNewLine[index_year]]+=parseFloat(myNewLine[index_value]);//adding value based on year for every country in the array
   }
   
 };
 //seperating the key and value of an ojbect and pushing them ibnto an array
 var jArray = [];
 var object = {};
 for(var propt in obj_Female){
 var object = {};
 object["Year"]=propt;
 object["Value"]=obj_Female[propt]/Asian_Country.length;
 object["IndicatorName"]="Female";
 jArray.push(object);
 }
 for(var propt in obj_Male){
 var object = {};
 object["Year"]=propt;
 object["Value"]=obj_Male[propt]/Asian_Country.length;
 object["IndicatorName"]="Male";
 jArray.push(object);
 }
 //displaying the values
 console.log(jArray);
 //Writing a file
 var file = 'Asianew.json';
 //printing final object
 var obj = JSON.stringify(jArray);
 fs.writeFileSync(file, obj);
