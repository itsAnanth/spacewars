import express from 'express';

export default {
    path: '/',
    callback: async(req: express.Request, res: express.Response) => {
        res.send('reached post pagman');
    }
}