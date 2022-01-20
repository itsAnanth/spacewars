import { Server as t_server } from '../types/index';
import express from 'express';
import fs from 'fs';

interface Server extends t_server {}; 

const methodsPath: string[] = fs.readdirSync('./server/methods');

class Server {
    constructor(server: express.Application, PORT?: number, autoHandle?: boolean) {
        this.server = server;
        this.methods = {};
        this.PORT = PORT || 3000;
        this.autoHandle = autoHandle || true;
        this.init().then(() => this.handleRequests() && (this.autoHandle && this.listenToPort()));
    }

    async init(): Promise<void> {
        for (let i = 0; i < methodsPath.length; i++) {
            const method: string = methodsPath[i];
            const routesPath: string[] = fs.readdirSync(`./server/methods/${method}`);
            for (let j = 0; j < routesPath.length; j++) {
                const route = (await import(`../server/methods/${method}/${routesPath[j]}`)).default;
                !this.methods[method] && (this.methods[method] = []);
                this.methods[method].push(route);
            }
        }
    }

    handleRequests(): boolean {
        for (const [key, value] of Object.entries(this.methods)) {
            for (let route = 0; route < value.length; route++) {
                const { path, callback }: { path: string, callback: Function} = value[route];
                this.server[`${key.toLowerCase()}`].apply(this.server, [path, callback]);
            }
        }
        return true;
    }

    listenToPort(): void {
        this.server.listen(this.PORT, () => console.log(`Listening on port ${this.PORT}`));
    }
}


export default Server;
