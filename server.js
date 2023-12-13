import http from 'http';
import { app } from './app.js';

const port = 4000;

const server = http.createServer(app);

server.listen(port);

server.on('listening', () => {
  console.log(`Listening at port ${port}...`);
});

process.on('unhandledRejection', err =>{
  console.log(err.name, err.message);
  console.log('Unhandled Rejection, Server is shutting down...');
  server.close(()=>{
      process.exit(1);
  })
})