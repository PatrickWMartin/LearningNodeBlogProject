const http = require('http');
const fs = require('fs');
const response = require('./response');

async function app(){
  const routes = new Map();

  function server(port=8000, callBack) {
    console.log(`Listening on port ${port}...`)
    return http.createServer(requestHandler).listen(port, () => {
      if (callBack){
        console.log("hello sir");
      }
      });
  }

  function static(dirName){
    //fs.readFile();
    return "Nothing for now"
  }

  async function serveStaticFile(fileName, dirName = 'views') {
    try {
      const data = await fs.readFile(`./${dirName}/${fileName}`, 'utf8');
      return data;
    } catch (error) {
      throw new Error('File not found');
    }
  }
  function get(path, func){
    if (typeof func !== 'function')
      throw new Error('get callback must be a function');

    routes.set(`${path}:GET`, func)
  }
  function post(path, func){
    if (typeof func !== 'function')
    throw new Error('post callback must be a function');
    routes.set(`${path}:POST`, func)
  }
  function put(path, func){
    if (typeof func !== 'function')
    throw new Error('post callback must be a function');
    routes.set(`${path}:PUT`, func)
  }
  function del(path, func){
    if (typeof func !== 'function')
    throw new Error('post callback must be a function');
    routes.set(`${path}:DELETE`, func)
  }

  function requestHandler(req, responseObject){
    const url = req.url;
    res = response(responseObject);
    if(url !== '/favicon.ico'){
      const method = req.method;
      const urlRoute = `${url}:${method}`;

      const responseFunction = routes.get(urlRoute) || null;

      if (responseFunction === null){
        res.resObject.writeHead(404, {'Content-Type': 'text/plain'});
        res.resObject.end('404 - Not Found');
      } else{
        responseFunction(req, res);
      }
    }
  }


  return {get, post, routes, server, serveStaticFile}
}


test = app();

test.get('/',  (req, res) => {
  //let con = await test.serveStaticFile('index.html','veiws')
  //console.log(con)
  //res.send(test.serveStaticFile('index.html','veiws'));
  console.log('in the index');
  res.send('done');
});
test.server();
