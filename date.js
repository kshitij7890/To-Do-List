
//alternative way : -
//module.exports.getDate=getDate;
//function getDate(){

exports.getDate=function (){

let today= new Date();
let options={
  weekday: "long",
  day :"numeric",
  month:"long"
};

return today.toLocaleDateString("en-US",options);
}

//suppose one more function then module.exports.getday
