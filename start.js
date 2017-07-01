const express = require('express')
const app = express()
const opn = require('opn')
opn('http://localhost:3000/home','google chrome')
app.use(express.static('public2'));
var Datastore=require('nedb')
app.set('port',process.env.PORT||5000)
app.set('view engine','ejs')
app.set('port',process.env.PORT||5000)


var dbreg=new Datastore({filename:'regstore.db',autoload:true});


app.get('/home', function (req, res) {
		res.sendFile(__dirname+"/public2/main.html")
	
})


app.get('/login', function (req, res) {
		res.sendFile(__dirname+"/public2/login.html")
	
})

app.get('/register', function (req, res) {
		res.sendFile(__dirname+"/public2/register.html")
	
})



app.get('/loginsubmit',function(req,res){
var email=req.query.emailid;
var password=req.query.pass;

var person= {
	"Email":email,
	"Password":password
}
dbreg.find(person,function(err,result){
	
	if(result.length>0)
	{
		console.log("login success")
		dbreg.find({},function(err,result1){
	if(result1.length>0)
	{console.log("search success")

	
	res.render('profile',{res:result,res1:result1})
	}
})
	}
else
	res.send("login fail invalid UserName and password");
})
})


app.get('/regsubmit',function(req,res){
var nme=req.query.Name
var emlid=req.query.Email;
var usrnme=req.query.uName;
var pswrd=req.query.Password;


var person= {
	"Name":nme,
	"Email":emlid,
	"UserName":usrnme,
	"Password":pswrd
}

dbreg.insert(person,function(err,result){
	console.log("registeration successful.")
	res.sendFile(__dirname+"/public2/login.html")
})
})




app.listen(app.get('port'), function () {
  console.log('Example app listening on port 3000!')
})	