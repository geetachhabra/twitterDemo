const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const ObjectId = require('mongodb').ObjectId;

const url = "mongodb://127.0.0.1:27017/twitter";
const port = 3000;
const c = console.log;


// app.set('views', __dirname + '/views');
app.use("/", express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())
 
 c("mangodb URL "+url);

     let today = new Date();
	 let date =(today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
	 let hours = today.getHours() > 12 ? today.getHours() - 12 : today.getHours();
     let am_pm = today.getHours() >= 12 ? "PM" : "AM";
     hours = hours < 10 ? "0" + hours : hours;
     let minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
     let time = hours + ":" + minutes + " " + am_pm;
	 let dateTime = date+' '+time;
	 let name ='Geeta';

app.post("/new/tweet/",function(req,res) {
	c("inside post");
	MongoClient.connect(url,{ useNewUrlParser: true },function( err,db ){
		 const database= db.db('twitter')
         let tweets=database.collection('tweets')
		//let tweets = db.collection('tweets');
		tweets.insertOne({
	    	timestamp : dateTime,
	    	name : name,
	    	handle:'@Geeta',
	    	tweet : req.body.tweet
    })
	})
	res.redirect('/');
})
	
app.get("/",function(req,res){
	res.sendFile(__dirname + '/index.html');
})


app.get("/tweets",function(req,res) {
	 MongoClient.connect(url,{ useNewUrlParser: true },function( err,db ){
	 	c("inside get /tweets");
	const database= db.db('twitter')
    let tweets=database.collection('tweets')
	tweets.find({}).toArray((error,result) => {
		c("result"+result);
			res.send(JSON.stringify(result));
		})
})
})

app.get("/profile",function(req,res) {
	 MongoClient.connect(url,{ useNewUrlParser: true },function( err,db ){
	 	c("inside get /profile");
	const database= db.db('twitter')
    let profile=database.collection('profile')
	profile.find({}).toArray((error,result) => {
		c("result"+result);
			res.send(JSON.stringify(result));
		})
})
})
app.put("/tweet/update/:id",function(req,res) {
	c("inside put");
	try{
		MongoClient.connect(url,{ useNewUrlParser: true },function( err,db ){
		 const database= db.db('twitter')
         let tweets=database.collection('tweets')
		//let tweets = db.collection('tweets');
		tweets.updateOne({
	    	_id: new ObjectId(req.params.id)},{$set : {
	    		tweet : req.body.tweet
	    	}})
	    	
    })}
		catch(err)
		{c(err);}
		res.end();
	})
app.delete("/tweet/delete/:id",function(req,res) {
	c("inside delete");
	try{
		MongoClient.connect(url,{ useNewUrlParser: true },function( err,db ){
		 const database= db.db('twitter')
         let tweets=database.collection('tweets')
		//let tweets = db.collection('tweets');
		tweets.remove({
	    	_id: new ObjectId(req.params.id)},function(err,results){
	    		if(!err){
	    			c(results);}
	    			else{c(err);}
	    		});
	    	});
	    	
    }
		catch(err)
		{c(err);}
	})
app.listen(port,( err ) => {
	!err?c('listening',port):c('err',err);
})