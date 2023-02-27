#!/usr/bin/env node

const http = require('http');

const config = require('../config')[process.env.NODE_ENV || 'development'];

const log = config.log();
const app = require('../app')(config);

const server = http.createServer(app);
const PORT = process.env.PORT || 5005

server.listen(PORT);

server.on('listening', () => {
  log.info(
    `Hi there! I'm listening on port ${server.address().port} in ${app.get('env')} mode.\nFollow link (Ctrl+Click): http://localhost:${PORT}`,
  );
});