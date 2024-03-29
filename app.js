const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let items=["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.get("/", function(req, res){
    let today = new Date();
    
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US", options);
     
    res.render("list", {listTitle: day, newListItems: items });
});

app.post("/", function(req, res){

    let item = req.body.nameItem;
    console.log(req.body);
    if(req.body.button === "Work"){
        workItems.push(item);
        res.redirect("/work");
    } else{
        items.push(item);
        res.redirect("/");
    }
    
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems });
})

app.get("/about", function(req, res){
    res.render("about");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server running at port 3000");
});             
