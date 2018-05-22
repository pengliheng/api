// package
const Koa = require('koa');
const http = require('http');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

// local
const allRouter = require('./routes/index.js');

// application
const app = new Koa();
const port = process.env.PORT;
const server = http.createServer(app.callback());

// core config
app
  .use(bodyParser())
  .use(cors())
  .use(allRouter.routes())
  .use(allRouter.allowedMethods())

server.listen(port, () => {
  console.log(` >>> port: ${port}`);
  console.log(` >>> ENV: ${process.env.NODE_ENV}`);
});
