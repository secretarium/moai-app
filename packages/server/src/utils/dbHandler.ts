/*eslint no-console: "off"*/
import dbcon from './dbConnection';
import { MongoClient } from 'mongodb';

// Current level of the DB
// This field is to be updated with subsequent versions of the DB
const CURRENT_VERSION = 1;

type MigratedClientPromise = () => Promise<MongoClient>;

export async function migrate(): Promise<MigratedClientPromise> {

    const db = await dbcon().then(client => client.db());

    // Verify the MOAI_KV configuration table exists
    const isIntitialized = await db.collections().then(cols => cols.filter(col => col.collectionName === 'MOAI_KV')).then(res => res.length > 0);
    let stepVersion = 0;

    if (!isIntitialized) {
        // If not create it and initialize CURRENT_VERSION
        await db.createCollection('MOAI_KV');
        await db.collection('MOAI_KV').insertOne({
            key: 'CURRENT_VERSION',
            value: '0',
            created_at: (new Date()).getTime(),
            updated_at: (new Date()).getTime()
        });
    } else {
        // Otherwise fetch the CURRENT_VERSION
        const stepVersionResult = await db.collection('MOAI_KV').findOne({
            key: 'CURRENT_VERSION'
        });

        if (stepVersionResult !== undefined && stepVersionResult.value !== undefined)
            stepVersion = parseInt(stepVersionResult.value) || 0;
    }


    if (stepVersion !== CURRENT_VERSION) {

        if (CURRENT_VERSION < stepVersion)
            return Promise.reject(new Error('The existing database was created with a newer version of Optimise ! Please upgrade before using Optimise !'));

        // For every table file launch the update for sequential version up
        while (stepVersion < CURRENT_VERSION) {
            stepVersion++;
            // TODO: Jump from version to version
        }

        // Finally set the CURRENT_VERSION to the current level
        await db.collection('MOAI_KV').updateOne({ key: 'CURRENT_VERSION' }, {
            $set: {
                value: `${stepVersion}`,
                updated_at: (new Date()).getTime()
            }
        }, { upsert: true });
    }

    return dbcon;
}

export default {
    migrate
};