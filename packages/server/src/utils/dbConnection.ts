import { MongoClient } from 'mongodb';
import config from '../../config/moai.config';

let connection: MongoClient;

export default (): Promise<MongoClient> => new Promise((resolve, reject) => {
    if (connection === undefined) {
        MongoClient.connect(config.mongo, {
            useNewUrlParser: true
        }, (err, client) => {
            if (err !== null)
                reject(err);
            connection = client;
            resolve(connection);
        });
    } else
        resolve(connection);
});