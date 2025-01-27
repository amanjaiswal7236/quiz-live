import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse, UrlWithParsedQuery } from 'url';
import next from 'next';
import WebSocket, { WebSocketServer } from 'ws';

const dev: boolean = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = createServer((req: IncomingMessage, res: ServerResponse) => {
        const parsedUrl: UrlWithParsedQuery = parse(req.url || '', true);
        handle(req, res, parsedUrl);
    });

    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws: WebSocket) => {
        console.log('New client connected');

        ws.on('message', (message: string) => {
            console.log(`Received message: ${message}`);
            ws.send(`Server: ${message}`);
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });

    server.listen(3000, (err?: Error) => {
        if (err) {
            console.error(err);
            throw err;
        }
        console.log('> Ready on http://localhost:3000');
    });
});
