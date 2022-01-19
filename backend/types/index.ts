import express from 'express';
import keyv from '@keyvhq/core';

interface Server {
    server: express.Application;
    methods: object;
    autoHandle: boolean;
    PORT: number;
}

interface Database {
    keyv: keyv;
}

export type { Server, Database };

