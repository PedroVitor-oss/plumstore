const express = require("express");
const app = express();
const fs = require('fs');

const path = require("path")
app.use(express.static(path.join(__dirname,'public')));
// console.log(__dirname)

// configurar handlebars
const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars.engine('main'));
app.set('view engine', 'handlebars');
app.set('views', './views');

//configuração Body-Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//;data
let data = require("./data/data.json")
let produtos = data.produtos;
console.log(produtos);
app.get("/",(req,res)=>{
    const isMobile = req.headers['user-agent'].includes("Mobile");
    if(isMobile){
         res.redirect("/mobile");
    }

    res.render("home",{
        styles:["/css/home.css"],
        produtos:produtos
    });
})

app.get("/adimin",(req,res)=>{
    res.render("adimin",{
        addTitle:" - Adimin",
        produtos:produtos

    });
})

app.get("/mobile",(req,res)=>{
    res.render("mobile");
})

app.post("/saveProdutos", (req, res) => {
    const filePath = path.join(__dirname, 'data', 'data.json'); // Caminho do arquivo JSON

    // Lê o conteúdo atual do arquivo JSON
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Erro ao ler o arquivo:", err);
            return res.status(500).json({ message: "Erro ao ler o arquivo" });
        }

        let jsonData = JSON.parse(data); // Converte o JSON para um objeto
        jsonData.produtos = req.body.produtos; // Atualiza o array `produtos` com os dados recebidos
        produtos = req.body.produtos;
        // Salva o novo conteúdo no arquivo JSON
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                console.error("Erro ao salvar os dados:", err);
                return res.status(500).json({ message: "Erro ao salvar os dados" });
            }
            res.json({ message: "Dados salvos com sucesso" });
        });
    });
});
app.listen(8000,console.log("site plum aberto"));