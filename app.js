const http = require('http');
const fs = require('fs');
const response = require('./response');


function expresso() {
  const routes = new Map();
  const middleware = [];

  function get(path, callback) {
    if (typeof callback !== 'function'){
      throw new Error('Callback must be a function');
    }
    routes.set(`${path}:GET`, callback);
  }

  function post(path, callback) {
    if (typeof callback !== 'function'){
      throw new Error('Callback must be a function');
    }
    routes.set(`${path}:POST`, callback)
  }

  function handleRequest(reqObject, resObject) {
    const { url, method } = reqObject;
    const res = response(resObject);
    const routeHandler = routes.get(`${url}:${method}`);
    if (routeHandler) {
      routeHandler(reqObject, res);
    } else {
      res.statusCode = 404;
      res.end('Not Found');
    }
  }

  function listen(port, callback) {
    const http = require('http');
    const server = http.createServer((req, res) => {
        handleRequest(req, res);
    });

    server.listen(port, callback);
  }

  return {
    get,
    post,
    listen
  };
}

const app = expresso();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
