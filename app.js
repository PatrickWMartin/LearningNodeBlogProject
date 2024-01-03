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
		if (typeof func !== 'function')
			throw new Error('get callback must be a function');

		routes.set(`${path}/GET`, func)
	}
	function post(path, func){
		if (typeof func !== 'function')
			throw new Error('post callback must be a function');
		routes.set(`${path}/POST`, func)
	}

	function requestHandler(req, responseObject){
		const url = req.url;
		res = response(responseObject);
		if(url !== '/favicon.ico'){
			const method = req.method;
			const urlRoute = `${url}/${method}`;
			routes.get(urlRoute)(req, res);
		}
	}


	return {get, post, routes, server}
}

function response(res){
	function send(content){
		res.end(content);
	}

	return{send,}
}

test = app();

test.get('/', (req, res) => {
	res.send('Hello World');
	console.log('in the index');
});

test.server();
