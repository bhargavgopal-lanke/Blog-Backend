const express = require('express');

/*const bodyParser = require('body-parser');*/

const app = express();

const cors = require('cors');

const db = require('./config/db');

/*app.use(bodyParser.json());*/
app.use(express.json());


const PORT = 3001;

app.use(cors());

app.get('/api/get', (req,res)=>{
	db.query('SELECT * FROM posts', (err, result)=>{
		if(err) {
			console.log(err);
		}
		res.send(result);
	})
});

app.get('/api/getFromId/:id', (req,res)=> {

	const id = req.params.id;

	db.query('SELECT * FROM posts WHERE id = ?', id, (err, result)=>{
		if(err) {
			console.log(err);
		}
		res.send(result);
	})
});

app.post('/api/create', (req,res)=>{

	const username = req.body.userName;
	const title = req.body.title;
	const text = req.body.text;

	console.log(username + title + text);

	db.query('INSERT INTO posts (title, post_text, user_name) VALUES (?,?,?)', [title,text,username] , (err, result)=>{
		if (err) {
			console.log(err);
		}
		console.log(result);
	})
});

app.post('/api/like/:id', (req,res)=> {
	const id = req.params.id;
	db.query('UPDATE posts set likes = likes + 1 WHERE id = ?',id, (err, result)=>{
		if(err) throw err;
		console.log(result);
	})
});

app.listen(PORT, ()=> {
	console.log(`Server running on port ${PORT}`);
});