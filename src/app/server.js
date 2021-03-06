import Path from 'path';
import Express from 'express';
import compression from 'compression';
import router from './routes';

const serverDir = Path.dirname(process.argv[1]);
process.chdir(serverDir);
process.on('unhandledRejection', (reason, p) => {
  console.error(reason);
});
process.on('rejectionHandled', (p) => {
  console.error(p);
});

const serverPort = parseInt(process.argv[2], 10) || 9090;

const staticMiddleware = Express.static('www');
const app = Express();

app.use(compression());
app.use(staticMiddleware);
app.use('/', router);

app.listen(serverPort, () => {
  console.log(`Served from http://localhost:${serverPort}`); // eslint-disable-line no-console
});
