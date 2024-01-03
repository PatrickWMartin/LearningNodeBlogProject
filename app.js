const http = require('http');
const fs = require('fs');

const PORT = 8000;
const server = http.createServer((req, res) => {
	console.log('A request has been made');
	console.log(req);

	res.setHeader('Content-Type', 'text/html');
	fs.readFile('./veiws/index.html', (err, data) => {
		if (err){
			console.log(err);
			res.end();
		} else{
			res.write(data);
			res.end();
		}
	});

});


server.listen(PORT, () => {
	console.log(`listening on port ${PORT}...`);
});



