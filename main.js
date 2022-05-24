//imports packs
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

//const
let app = express();
const Port = 3000;
let path = __dirname + '/public/views';

//uses
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public/views'))
app.set('views',path);
app.set('view engine','ejs');

//imports const
const userM = require('./models/user');
const usersA = require('./models/information');


//BD connection
mongoose
    .connect('')
    .then((db)=>{
        console.log('Base de datos conectada')
    }).catch((err)=>{
        console.log('Ocurrio un error al conectar a la base de datos')
    })
app.get('/', (req,res)=>{
    res.render('index')
})

app.post('/validar', async (req,res)=>{
    let email = req.body.email;
    let contrase = req.body.pass;
    let validadb  = await userM.find({$and:[{email:email},{pass:contrase}]});
    if(validadb.length != 0){
        let datos = validadb[0]["_id"].toString();
        let datosu = await usersA.find({ids:datos})
        if(datosu.length != 0){
            res.render('formulario',{info:datosu});
        }else{
            res.render('form2',{info:datos})
        }
    }else{
        res.render('index');
    }
    
    
})

app.post('/information', async (req,res)=>{
    let doc = req.body;
    console.log(doc)
    let e = await usersA.find({ids:doc.ids})
    console.log(e)
    if(e.length != 0){
        let idss = req.body.ids
        console.log(idss)
        let comparacion = await usersA.updateOne({ids:String(idss)},doc)     
    }else{
        let bA = await new usersA(doc);
        console.log('Guardando')
        console.log(bA)
        await bA.save()
    } 
    res.redirect('/');
})

app.listen(Port,()=>{
    console.log('Conectado en el puerto' + Port);
})