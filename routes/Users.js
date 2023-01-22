const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const router = express.Router();
const userSchema = require('../models/userInfo');
const clientSchema = require('../models/clientinfo');
const MongodbStore = require('connect-mongo');
const mongoose = require('mongoose');
//const flash = require('connect-flash');
const multer = require('multer');
//const { RouterEvent, RouterState } = require('@angular/router');
//const path = require('path');
const databaseURL1 = 'mongodb+srv://prat:root@cluster0.97zl4br.mongodb.net/userinfo?retryWrites=true&w=majority';
const databaseURL2 = 'mongodb+srv://prat:root@cluster0.97zl4br.mongodb.net/clientinfo?retryWrites=true&w=majority';

const conn1 = mongoose.createConnection(databaseURL1);
const conn2 = mongoose.createConnection(databaseURL2);
var insuranceco = new String();
var type = new String();
var access1 = 0;

router.use("/Clientimages", express.static("Clientimages"));

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Clientimages/');
    }, 
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('_');
        //const name = file.originalname;
        console.log("Filetype" + file.mimetype);
        type = file.mimetype;
        cb(null, name);
    }
})

const oneDay = 1000 * 60 * 60 * 24;
router.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false,
    store: MongodbStore.create({
        mongoUrl: 'mongodb+srv://prat:root@cluster0.97zl4br.mongodb.net/sessiontest?retryWrites=true&w=majority',
        ttl: 14 * 24 * 60 * 60,
        autoRemove: 'native',
        collectionName: 'session',
        saveUninitialized: false,
        unset: 'destroy',
    })
}));

router.use(cookieParser());

router.get('/', (req, res, next) => {
    session1 = req.session;
    if (session1.username) res.send("Welcome to the site.");
    res.redirect("/home");
    //res.send({method: req.method, url: req.url});
});

router.post('/', async (req, res) => {
    user = conn1.model('information', userSchema);
    if (req.body.access != 3) user1 = await user.find({username: req.body.username, access: req.body.access, password: req.body.password});
    else user1 = await user.find({username: req.body.username, access: req.body.access, password: req.body.password, insuranceco: req.body.insuranceco});
    //console.log(user1);
    //console.log(req.body.insuranceco);
    if (!user1.length){
        //req.flash("Incorrect credentials.");
        res.json(0);
    }
    else{
        session1 = req.session;
        session1.username = req.body.username;
        res.json(1);
        insuranceco = req.body.insuranceco;
        console.log(insuranceco);
        access1 = req.body.access;
    }
});

router.post('/healthcarenew', multer({storage: storage}).single('Identity-file'), async(req, res) => {
    client = conn2.model('cinformation', clientSchema);
    const url = req.protocol + '://'+ req.get("host") + "/";  
    req.body.filepath = url + req.file.path;
    // const newclient = new client({
    //     name: req.body.name,
    //     identification: req.body.identification
    // });
    // newclient.save(function (err, doc) {
    //     if (doc){
    //         res.json("Request saved succcesfully.");
    //         //res.redirect('/healthcare');
    //     }
    client.create(req.body, function(err, client) {
        if(err){
            console.log(error);
        }
        res.json(client);
    })
    
});

router.post('/healthcaredisplay', async(req, res) => {
    client = conn2.model('cinformation', clientSchema);
    client1 = await client.find({name: req.body.name});
    if (!client1.length){
        res.json("Not found.");
    }
    else{
        res.json(client1);
    }
});

router.get('/displaynotforwarded', async(req, res) => {
    client = conn2.model('cinformation', clientSchema);
    client2 = await client.find({status: "Not forwarded.", Insurance_compnay: insuranceco});
    res.json(client2);
})

router.post('/updateone', async(req, res) => {
    client = conn2.model('cinformation', clientSchema);
    client.findByIdAndUpdate(req.body.id, {status: "Forwarded"}, {new: 'true'}, function(err, doc){
        if (err){
            res.json(0);
        }
        //res.json(doc);
        res.json(1);
    })
})

router.get('/displayforwarded', async(req, res) => {
    client = conn2.model('cinformation', clientSchema);
    if (access1 == 3) client2 = await client.find({status: "Forwarded", Insurance_company: insuranceco});
    else client2 = await client.find({status: "Forwarded"});
    res.json(client2);
})

router.post('/updateinsurance', async(req, res) => {
    client = conn2.model('cinformation', clientSchema);
    // if (req.body.status="Accepted"){
    // client.findByIdAndUpdate(req.body.id, {status: req.body.status}, {new: 'true'}, function(err, doc){
    //     console.log(err);
    //     console.log(doc);
    //     if (err) res.json(0);
    //     else res.json(1);
    // })}
    // else{
    //     client.findByIdAndUpdate(req.body.id, {status: req.body.status}, {remittance_advice: req.body.RA},{new: 'true'}, function(err, doc){
    //         if (err) res.json(0);
    //         else res.json(1);
    //     })
    // }
    console.log(req.body.id);
    client.findByIdAndUpdate(req.body.id, {status: req.body.status, remittance_advice: req.body.RA}, {new:'true'}, function(err, doc){
        if (err) res.json(0);
        else res.json(1);
    })
})

router.get('/accepted', async(req, res)=>{
    client = conn2.model('cinformation', clientSchema);
    client2 = await client.find({status: "Accepted", Insurance_company: insuranceco});
    res.json(client2);
})

router.get('/rejected', async(req, res)=> {
    client = conn2.model('cinformation', clientSchema);
    client2 = await client.find({status: "Rejected", Insurance_company: insuranceco});
    res.json(client2);
})

router.get('/logout', async (req, res) => {
    console.log("In logout method");
    req.session = null;
    res.json("DONE.");
})

module.exports = router;