const express = require('express');
const hbs = require('hbs');
const validURL = require('valid-url').isWebUri;

const mongoose = require('./db/mongoose');
const {URL} = require('./models/url');

const port = process.env.PORT ||3000;

var app = express();

app.set('view engine','hbs');

app.get('/',(req,res)=>{
    res.render('main.hbs')
});

app.get('/:urlId',(req,res)=>{
    const id = req.params.urlId;
    if(isNaN(id)){
        return res.status(400).send({note:'This is not a valid id'})
    }
    URL.findById(id).then((doc)=>{
        if(!doc){
            return res.status(400).send({note:'Invalid id'})
        }
        res.redirect(doc.origurl);
    }).catch((e)=>{
        res.status(400).send();
    });

});

app.get('/new/*',(req,res)=>{
    var urlParam = req.params[0];
    if(!validURL(urlParam)){
        res.send({note: 'This is not a valid url!'})
    }else{
        var url = new URL({
            origurl:urlParam
        });

        url.save().then((doc)=>{
            res.send(doc.result);
        },(err)=>{
            res.status(400).send();
        });
    }


});

app.listen(port,()=>{
    console.log(`Started server on ${port}`);
});