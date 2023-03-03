#!/usr/bin/env node

const http = require('http');
const Sequelize = require('sequelize');

const config = require('../config')[process.env.NODE_ENV || 'development'];

const log = config.log();
const App = require('../app')

const sequelize = new Sequelize(config.postgres.options);

function connectToPostgres() {
 
  sequelize.authenticate().then(() => {
    console.log('Connection has been established Successfully!!!')
    log.info('Connection has been established sucessfully.')
  }).catch((error) => {
    log.error('Unable to connect to database:', error)
    process.exit(1);
  });
  
  return sequelize;
 
}

const postgresClient = connectToPostgres();
// console.log('postgresClient', postgresClient)
config.postgres.client = postgresClient;

const app = App(config)
const port = process.env.PORT || 5005
app.set("port", port)
const server = http.createServer(app);

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? `Pipe ${port}` : `Port  ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      log.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      log.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

server.on("error", onError);
server.on('listening', () => {
  log.info(
    `Hi there! I'm listening on port ${server.address().port} in ${app.get('env')} mode.\nFollow link (Ctrl+Click): http://localhost:${port}`,
  );
});


server.listen(process.env.PORT || 5005);