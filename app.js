//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const date=require(__dirname+"/date.js");

//console.log(date());

const app = express();

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-kshitij:Test123@cluster0-0ztba.mongodb.net/todolistDB",{useUnifiedTopology: true , useNewUrlParser:true});

const itemschema ={
  name: String
};

const item = mongoose.model("item",itemschema);

const item1 = new item({
   name:"kshitij"
});

const item2 = new item({
   name:"kshiti"
});

const item3 = new item({
   name:"kshit"
});

const defaultitems=[item1,item2,item3];




app.get("/", function(req, res){

  let day = date.getDate();
  //let day=date.getday();

  item.find({},function(err,founditems){
//console.log(founditems);

    if(founditems.length===0){
      item.insertMany(defaultitems,function(err){
        if(err)
        {
          console.log(err);
        }
        else {
            console.log("success");
          }

      });
      res.redirect("/");
    }
    else{
      res.render("list",{kindofday:day,newlistitems:founditems});
    }

  });

});

app.post("/",function(req,res){
  const itemname=req.body.newitem;
  const itemm=new item({
    name: itemname
  });
  itemm.save();
  res.redirect("/");
  //items.push(item);
//  res.send(<li>item</li>);
  //res.redirect("/");
});

app.post("/delete",function(req,res){
  const checkeditemid =req.body.checkbox;
  item.findByIdAndRemove(checkeditemid,function(err){
    if(err)
    {
      console.log(err);
    }
    else{
      console.log("success in removing that item from database");
      res.redirect("/");
    }
  });
});


app.listen(3000, function(){
  console.log("Server started on port 3000.");
});







//res.send can only be one ......use res.write ,s and at last write res.send()
