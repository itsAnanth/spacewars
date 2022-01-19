import { Database as t_Database } from '../types';
import { config } from 'dotenv';
config();
import Keyv from '@keyvhq/core';
import KeyvMongo from '@keyvhq/mongo';

interface Database extends t_Database {};

class Database {

    constructor(collection: any) {
        const store = new KeyvMongo(process.env.MONGO_URL, {
            collection: collection
        });

        const keyv = new Keyv({
            store,
            collection: collection,
        });
        keyv.on('error', (...error) => console.error('keyv error: ', ...error));

        this.keyv = keyv;
        return this;
    }

    async values() {
        const iterator = this.keyv.iterator();
        const values = [];
        for await (const [, value] of iterator)
            values.push(value);
        return values;
    }

}

export default Database;
