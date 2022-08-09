const express = require("express")
const app = express()
const port = 4004
const cors = require("cors")
const {createPool} = require('mysql');


let databaseList = "databaseList looking for connection...";
//const sqlRead ="SELECT * FROM my_sql_serv.new_movie;"; //lists all rows in the table


const pool = createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database:  "comments_schema",
    connectionLimit: 10,
    insecureAuth: true,
});

// npm init
// npm i express cors nodemon
// they add a handy req.body object to our req,
// containing a Javascript
//  object representing the payload sent with the request

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get("/", cors(), async (req, res) => {
	res.send("This is working")
})

app.get("/home", cors(), async (req, res) => {
	

	res.send( databaseList)
	
});

const sqlInsert = "INSERT INTO `comments_schema`.`commentor` ( `name`, `commentget`) VALUES ( ?, ?);" //inserts new data
//comment this section first
 app.post("/home", cors(), async (req, res) => {
	let { name, comment } = req.body


	pool.query(sqlInsert, [name, comment], (err, result, fields) =>{

		if (err){
			return console.log(err);  
		}
	
		return console.log(result);
	}); 


	console.log("*****")
	console.log(name)
	console.log(comment)
	console.log("*****")	

	//res.send(name);
}); 



app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`) ;
});