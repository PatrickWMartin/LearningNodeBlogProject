const http = require('http');
const fs = require('fs');
const path = require('path');
const response = require('./response');


function expresso() {
  const routes = new Map();
  const middlewareStack = [];

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
  function use(middleware){
    middlewareStack.push(middleware);
  }
  function static(root){
   //Need to understand middleware before implementing this 
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
      if (middlewareStack){
        middlewareStack[0](req, res, () => {
        handleRequest(req, res);
        });
      } else{
        handleRequest(req, res);
      }
    });

    server.listen(port, callback);
  }

  return {
    get,
    post,
    listen,
    use
  };
}

const app = expresso();
const port = 3000;

const myLogger = function (req, res, next){
  console.log('logged');
  next();
}

app.use(myLogger);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
