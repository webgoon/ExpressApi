#!/usr/bin/env node

const http = require('http');
const Sequelize = require('sequelize');

const config = require('../config')[process.env.NODE_ENV || 'development'];

const log = config.log();
const app = require('../app')(config);

async function connectToPostgres(){
  const sequelize = new Sequelize(config.postgres.options);
  try {
    await sequelize.authenticate();
    console.log('Connection has been established Successfully!!!')
    log.info('Connection has been established Successfully!!!')
    
    return sequelize;

  } catch (error) {
    console.error('Sorry! Unable to establish connection to database: > ', error)
    log.error('Sorry! Unable to establish connection to database: > ', error)
  }
}

const postgresClient = connectToPostgres();
config.postgres.client = postgresClient;

const server = http.createServer(app);
const PORT = process.env.PORT || 5005

server.listen(PORT);

server.on('listening', () => {
  log.info(
    `Hi there! I'm listening on port ${server.address().port} in ${app.get('env')} mode.\nFollow link (Ctrl+Click): http://localhost:${PORT}`,
  );
});