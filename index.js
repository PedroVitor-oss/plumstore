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
let tables = require('./modules/db/tables');
let users = tables.User;

console.log(produtos);
app.get("/",(req,res)=>{
    const isMobile = req.headers['user-agent'].includes("Mobile");
    if(isMobile){
         res.redirect("/mobile");
    }

    res.render("home");
})

app.get("/usuarios",(req,res)=>{
    res.render("usuarios");
})
app.get("/login",(req,res)=>{
    res.render("login");
})
app.post("/login",(req,res)=>{

    console.log("dados carregados: ", req.body.mail, req.body.password);
console.log("login:", req.query.login);

if (req.query.login == "true") {
    // login
    console.log("tela de login");
    res.redirect("/");
} else {
    // novo usuário - verificação de duplicação de e-mail
    users.findOne({ where: { name: req.body.mail } })
        .then(existingUser => {
            if (existingUser) {
                // Se o e-mail já existe, renderize a página com uma mensagem de erro
                console.log("Usuário já existe");
                res.render("login", { message: "E-mail já cadastrado." });
            } else {
                // Se o e-mail não existe, crie o novo usuário
                users.create({
                    name: req.body.mail,
                    password: req.body.password,
                }).then(val => {
                    res.redirect('/');
                }).catch(err => {
                    console.error("Falha ao salvar usuário");
                    console.log(err);
                    res.render("login", { message: "Erro ao criar usuário." });
                });
            }
        })
        .catch(err => {
            console.error("Erro ao verificar usuário existente");
            console.log(err);
            res.render("login", { message: "Erro de sistema. Tente novamente mais tarde." });
        });
}

})
app.get("/sobre",(req,res)=>{
    res.render("sobre");
})
app.get("/suporte",(req,res)=>{
    res.render("suporte");
})



app.get("/admin",(req,res)=>{
    res.render("admin",{
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