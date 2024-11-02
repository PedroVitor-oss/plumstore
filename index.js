const express = require("express");
const app = express();

const path = require("path")
app.use(express.static(path.join(__dirname,'public')));
// console.log(__dirname)

// configurar handlebars
const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars.engine('main'));
app.set('view engine', 'handlebars');
app.set('views', './views');


app.get("/",(req,res)=>{
    const isMobile = req.headers['user-agent'].includes("Mobile");
    if(isMobile){
         res.redirect("/mobile");
    }

    res.render("home",{
        styles:["/css/home.css"]
    });
})

app.get("/mobile",(req,res)=>{
    res.render("mobile");
})
app.listen(8000,console.log("site plum aberto"));