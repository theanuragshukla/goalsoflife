const express = require('express')
const app = express()
const http = require('http').Server(app)
const db = require("./config/database");
const port = process.env.PORT || 3000
const bcrypt = require("bcryptjs")
const saltRounds=10
app.use('/static',express.static(__dirname + "/static"))
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

app.get('/',(req,res)=>{
	res.status=200
	res.sendFile(__dirname+'/static/index.html')
})

app.get('/new-user',(req,res)=>{
	res.status=200
	res.sendFile(__dirname+'/static/signup.html')
})

app.post("/add-new-user",async (req,res)=>{
	const userquery = `
	SELECT * FROM users WHERE username = $1;
	`;
	const uservalues = [req.body.user];
	const dupUser = await db.query(userquery, uservalues);
	if( dupUser.rows.length!=0){
			res.send({status:false,user:true,result:"user exists"})
		return
	}
	const emailquery = `
	SELECT * FROM users WHERE email = $1;
	`;
	const emailvalues = [req.body.email];
	const dupEmail = await db.query(emailquery, emailvalues);
	if( dupEmail.rows.length!=0){
			res.send({status:false,email:true,result:"email exists"})
		return
	}
	const query = `
	INSERT INTO users (username,fname,lname,email,pass) 
	VALUES($1,$2,$3,$4,$5)
	RETURNING *;
	`;
	var passhash
	await bcrypt.hash(req.body.pass, saltRounds).then(function(hash) {
		passhash=hash
	});
	const values = [req.body.user, req.body.fname,req.body.lname,req.body.email,passhash];
	const { rows } = await db.query(query, values)
	res.send({status:true,result:rows[0]})
})


app.post("/let-me-in",async (req,res)=>{
	const query = `
	SELECT * FROM users WHERE username = $1;
	`;
	const values = [req.body.user];
	const { rows } = await db.query(query, values);
	if(rows.length==0){
		res.send({status:false ,result:"not found"})
	}else{
		console.log(rows)
		const match = await bcrypt.compare(req.body.pass, rows[0].pass)
		if(match){
			res.send({status:true,result:rows[0].fname+" "+rows[0].lname})
		}
		else{
			res.send({status:false,result:"wrong username or password"})
		}
	}
})


const server = http.listen(port,()=>{
	console.log(`server is running on port ${port}`)
})


