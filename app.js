const http = require('http');
const fs = require('fs');

function app(){
	const routes = new Map();

	function server(port=8000, callBack) {
		console.log(`Listening on port ${port}...`)
		return http.createServer(requestHandler).listen(port, () => {
			if (callBack){
				console.log("hello sir");
			}
		});
	}
	
	function get(path, func){
		routes.set(`${path}/GET`, func)
	}
	function post(path, func){
		routes.set(`${path}/POST`, func)
	}

	function requestHandler(req, res){
		const url = req.url;
		if(url !== '/favicon.ico'){
			const method = req.method;
			const urlRoute = `${url}/${method}`;
			console.log(routes)
			console.log(routes.get(urlRoute)(req, res));
			res.write("Hello");
			res.end();
		}
	}


	return {get, post, routes, server}
}


test = app();
test.get('/', (req, res) => {
	//res.send('Hello World');
	console.log('in the index');
});
test.get('/hello', '2');
test.server();
	//.listen(8000);
