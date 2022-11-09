const { NlpManager } = require("node-nlp");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const manager = new NlpManager({ languages: ["en"] });
manager.load();
var readline = require("readline");
var rl = readline.createInterface(process.stdin, process.stdout);

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

console.log("Starting Chatbot ...");

console.log("Chatbot started!");
rl.setPrompt("> ");
rl.prompt();

 app.post('/messenger', (req, res) => {
		const book = req.body;
		// Output the book to the console for debugging
		console.log("response from client: ",book.sender);
		var msg = book.sender;
		rl.prompt();
		async function run() {
		const response = await manager.process("en", msg);
		console.log("NLP said: ",response.answer);
		res.send(response.answer);
		rl.prompt();
		rl.on("close", function () {
		process.exit(0);
	});
}
run();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));