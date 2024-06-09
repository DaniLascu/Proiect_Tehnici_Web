const express = require("express");
const fs= require('fs');
const path=require('path');
const sharp=require('sharp');
const sass=require('sass');
const ejs=require('ejs');
const AccesBD= require("./module_proprii/accesbd.js");

const formidable=require("formidable");
const {Utilizator}=require("./module_proprii/utilizator.js")
const session=require('express-session');
const Drepturi = require("./module_proprii/drepturi.js");

const Client = require('pg').Client;

var client= new Client({
        database:"proiect_tehnici_web",
        user:"dani",
        password:"dani",
        host:"localhost",
        port:5432});
client.connect();

client.query("select * from unnest(enum_range(null::gen_ceas))", function(err,rez){
    console.log(rez);
})

vect_foldere = ["temp","temp1","backup","poze_uploadate"]
for(let folder of vect_foldere){
    let caleFolder = path.join(__dirname, folder);
    if(!fs.existsSync(caleFolder))
        fs.mkdirSync(caleFolder);
}

obGlobal ={
    obErori:null,
    obImagini:null,
    folderCss: path.join(__dirname, "resurse/css"),
    folderScss: path.join(__dirname, "resurse/scss"),
    folderBackup: path.join(__dirname, "backup"),
}

app= express();
console.log("Folder proiect", __dirname);
console.log("Cale fisier", __filename);
console.log("Director de lucru", process.cwd());

app.use(session({ // aici se creeaza proprietatea session a requestului (pot folosi req.session)
    secret: 'abcdefg',//folosit de express session pentru criptarea id-ului de sesiune
    resave: true,
    saveUninitialized: false
  }));

app.set("view engine","ejs");

app.use("/resurse", express.static(__dirname+"/resurse"));
app.use("/poze_uploadate", express.static(__dirname+"/poze_uploadate"));
app.use("/node_modules", express.static(__dirname+"/node_modules"));

app.use(function(req,res,next){
    client.query("select * from unnest(enum_range(null::gen_ceas))", function(err,rezOptiuni){
        res.locals.optiuniMeniu = rezOptiuni.rows;
        next();
    })
})

app.get(["/","/index","/home"], function(req,res){
    //res.sendFile(__dirname+"/index.html");
    res.render("pagini/index", {ip:req.ip, imagini:obGlobal.obImagini.imagini});
});

//----------------------Produse----------------------

app.get("/produse", function(req, res){
    console.log(req.query)
    var conditieQuery = "";
    if(req.query.tip){
        conditieQuery = ` where gen_ceas='${req.query.tip}' or gen_ceas='unisex'`
    }
    client.query("select * from unnest(enum_range(null::gen_ceas))", function(err,rezOptiuni){
        
        client.query(`select * from ceasuri ${conditieQuery}`, function(err, rez){
            if(err){
                console.log(err);
                afisareEroare(res, 2);
            }
            else{
                res.render("pagini/produse", {produse: rez.rows, optiuni:rezOptiuni.rows} )
            }
            
        })
    });
})

app.get("/produs/:id", function(req, res){
    client.query(`select * from ceasuri where id=${req.params.id}`, function(err, rez){
        if (err){
            console.log(err);
            afisareEroare(res, 2);
        }
        else{
            res.render("pagini/produs", {prod: rez.rows[0]})
        }
    })
})

//--------------------------------Utilizatori-------------------------

app.post("/inregistrare",function(req, res){
    var username;
    var poza;
    var formular= new formidable.IncomingForm()
    formular.parse(req, function(err, campuriText, campuriFisier ){//4
        console.log("Inregistrare:",campuriText);


        console.log(campuriFisier);
        console.log(poza, username);
        var eroare="";


        // TO DO var utilizNou = creare utilizator
        var utilizNou = new Utilizator();
        try{
            utilizNou.setareNume=campuriText.nume[0];
            utilizNou.setareUsername=campuriText.username[0];
            utilizNou.email=campuriText.email[0]
            utilizNou.prenume=campuriText.prenume[0]
           
            utilizNou.parola=campuriText.parola[0];
            utilizNou.culoare_chat=campuriText.culoare_chat[0];
            utilizNou.poza= poza[0];
            Utilizator.getUtilizDupaUsername(campuriText.username[0], {}, function(u, parametru ,eroareUser ){
                if (eroareUser==-1){//nu exista username-ul in BD
                    //TO DO salveaza utilizator
                    utilizNou.salvareUtilizator();
                }
                else{
                    eroare+="Mai exista username-ul";
                }


                if(!eroare){
                    res.render("pagini/inregistrare", {raspuns:"Inregistrare cu succes!"})
                   
                }
                else
                    res.render("pagini/inregistrare", {err: "Eroare: "+eroare});
            })
           


        }
        catch(e){
            console.log(e);
            eroare+= "Eroare site; reveniti mai tarziu";
            console.log(eroare);
            res.render("pagini/inregistrare", {err: "Eroare: "+eroare})
        }
   

    });
    formular.on("field", function(nume,val){  // 1
   
        console.log(`--- ${nume}=${val}`);
       
        if(nume=="username")
            username=val;
    })
    formular.on("fileBegin", function(nume,fisier){ //2
        console.log("fileBegin");
       
        console.log(nume,fisier);
        //TO DO adaugam folderul poze_uploadate ca static si sa fie creat de aplicatie
        //TO DO in folderul poze_uploadate facem folder cu numele utilizatorului (variabila folderUser)
        var folderUser = path.join(__dirname, "poze_uploadate",username);
        if(!fs.existsSync(folderUser)){
            fs.mkdirSync(folderUser)
        }
       
        fisier.filepath=path.join(folderUser, fisier.originalFilename)
        poza=fisier.originalFilename;
        //fisier.filepath=folderUser+"/"+fisier.originalFilename
        console.log("fileBegin:",poza)
        console.log("fileBegin, fisier:",fisier)


    })    
    formular.on("file", function(nume,fisier){//3
        console.log("file");
        console.log(nume,fisier);
    });
});

//trimiterea unui mesaj fix
app.get("/cerere",function(req,res){
    res.send("<b>Hello!</b><span style='color:red'> world!</span>");
});

//trimiterea unui mesaj dinamic
app.get("/data",function(req,res,next){
    res.write("Data:");
    next();
});
app.get("/data",function(req,res){
    res.write(""+new Date());
    res.end();
});

app.get("/suma/:a/:b",function(req,res){
    var suma = parseInt(req.params.a) + parseInt(req.params.b);
    res.send(""+suma);
});

app.get("/favicon.ico", function(req, res){
    res.sendFile(path.join(__dirname, "resurse/favicon/favicon.ico"));
});

app.get(new RegExp("^\/[a-z0-9A-Z\/]*\/$"), function(req,res){
    afisareEroare(res, 403);
});

app.get("/*.ejs", function(req,res){
    afisareEroare(res,400);
});

app.get("/*", function(req, res){
    console.log(req.url);
    try{
        res.render("pagini"+req.url,function(err, rezHtml){
            //console.log("Pagina",rezHtml);
            //console.log("Error",err);
            if(err){
                if(err.message.startsWith("Failed to lookup view")){
                    afisareEroare(res, 404);
                    console.log("Nu a gasit pagina:", req.url);
                }
            }
            else{
                res.send(rezHtml+"");
            }
        });
    }
    catch(err1){
        if(err1){
            if(err1.message.startsWith("Cannot find module")){
                afisareEroare(res, 404);
                console.log("Nu a gasit resursa:", req.url);
            }
        }
        else{
            afisareEroare(res);
            console.log("Eroare:"+err1);
        }
    }
});

function initErori(){
    var continut = fs.readFileSync(path.join(__dirname,"resurse/json/erori.json")).toString("utf-8");
    console.log(continut);

    obGlobal.obErori=JSON.parse(continut);
    for(let eroare of obGlobal.obErori.info_erori){
        eroare.imagine = path.join(obGlobal.obErori.cale_baza,eroare.imagine);
    }
    console.log(obGlobal.obErori);
    obGlobal.obErori.eroare_default.imagine = path.join(obGlobal.obErori.cale_baza,obGlobal.obErori.eroare_default.imagine);
}

initErori();

function afisareEroare(res, _identificator, _titlu, _text, _imagine){
    let eroare = obGlobal.obErori.info_erori.find(
        function(elem){
            return elem.identificator == _identificator
        }
    )
    if(!eroare){
        let eroare_default = obGlobal.obErori.eroare_default
        res.render("pagini/eroare.ejs", {
            titlu: _titlu || eroare_default.titlu,
            text: _text || eroare_default.text,
            imagine: _imagine || eroare_default.imagine
        })
    }
    else{
        if(eroare.status)
            res.status(eroare.identificator);
        res.render("pagini/eroare.ejs", {
            titlu: _titlu || eroare.titlu,
            text: _text || eroare.text,
            imagine: _imagine || eroare.imagine
        });
    }
}

function initImagini(){
    var continut= fs.readFileSync(path.join(__dirname,"/resurse/json/galerie.json")).toString("utf-8");

    obGlobal.obImagini=JSON.parse(continut);
    let vImagini=obGlobal.obImagini.imagini;

    let caleAbs=path.join(__dirname,obGlobal.obImagini.cale_galerie);
    let caleAbsMediu=path.join(__dirname,obGlobal.obImagini.cale_galerie, "mediu");
    if (!fs.existsSync(caleAbsMediu))
        fs.mkdirSync(caleAbsMediu);

    //for (let i=0; i< vErori.length; i++ )
    for (let imag of vImagini){
        [numeFis, ext]=imag.cale_imagine.split(".");
        let caleFisAbs=path.join(caleAbs,imag.cale_imagine);
        let caleFisMediuAbs=path.join(caleAbsMediu, numeFis+".webp");
        sharp(caleFisAbs).resize(400).toFile(caleFisMediuAbs);
        imag.cale_imagine_mediu=path.join("/", obGlobal.obImagini.cale_galerie, "mediu",numeFis+".webp" )
        imag.cale_imagine=path.join("/", obGlobal.obImagini.cale_galerie, imag.cale_imagine )
        
    }
    console.log(obGlobal.obImagini);
}
initImagini();

function compileazaScss(caleScss, caleCss){
    console.log("cale:",caleCss);
    if(!caleCss){

        let numeFisExt=path.basename(caleScss);
        let numeFis=numeFisExt.split(".")[0]   /// "a.scss"  -> ["a","scss"]
        caleCss=numeFis+".css";
    }
    
    if (!path.isAbsolute(caleScss))
        caleScss=path.join(obGlobal.folderScss,caleScss )
    if (!path.isAbsolute(caleCss))
        caleCss=path.join(obGlobal.folderCss,caleCss )
    

    let caleBackup=path.join(obGlobal.folderBackup, "resurse/css");
    if (!fs.existsSync(caleBackup)) {
        fs.mkdirSync(caleBackup,{recursive:true})
    }
    
    // la acest punct avem cai absolute in caleScss si  caleCss
    //TO DO
    let numeFisCss=path.basename(caleCss);
    if (fs.existsSync(caleCss)){
        fs.copyFileSync(caleCss, path.join(obGlobal.folderBackup, "resurse/css",numeFisCss ))// +(new Date()).getTime()
    }
    rez=sass.compile(caleScss, {"sourceMap":true});
    fs.writeFileSync(caleCss,rez.css)
    //console.log("Compilare SCSS",rez);
}
//compileazaScss("a.scss");
vFisiere=fs.readdirSync(obGlobal.folderScss);
for( let numeFis of vFisiere ){
    if (path.extname(numeFis)==".scss"){
        compileazaScss(numeFis);
    }
}


fs.watch(obGlobal.folderScss, function(eveniment, numeFis){
    console.log(eveniment, numeFis);
    if (eveniment=="change" || eveniment=="rename"){
        let caleCompleta=path.join(obGlobal.folderScss, numeFis);
        if (fs.existsSync(caleCompleta)){
            compileazaScss(caleCompleta);
        }
    }
})

app.listen(8080);
console.log("Serverul a pornit");