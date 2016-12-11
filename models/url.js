const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connect = require('./../db/mongoose').connection;

autoIncrement.initialize(connect);

var URLSchema = new mongoose.Schema({
    origurl:{
        type:String,
        required:true,
        trim:true,
        minlength:1,
        unique:true
    }
});

URLSchema.virtual('result').get(function(){
    return {originalURL:this.origurl,shortURL:`https://cryptic-inlet-31734.herokuapp.com/${this._id}`};
});

var URL =  mongoose.model('URL',URLSchema);
URLSchema.plugin(autoIncrement.plugin, 'URL');

module.exports = {URL};

