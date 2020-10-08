import * as Utils from './secretarium.utils';
import { ErrorMessage, ErrorCodes } from './secretarium.constant';
import crypto from './msrcrypto';

export interface ExportedKey {
    publicKey: JsonWebKey; // need to use raw (pkcs8) as soon as firefox fixes bug 1133698
    privateKey: JsonWebKey; // need to use raw (pkcs8) as soon as firefox fixes bug 1133698
}

export class Key {

    cryptoKey: CryptoKeyPair | null = null;
    publicKeyRaw: Uint8Array | null = null;
    exportableKey: ExportedKey | null = null;

    async setCryptoKey(publicKey: CryptoKey, privateKey: CryptoKey): Promise<void> {
        this.cryptoKey = { publicKey: publicKey, privateKey: privateKey };
        this.publicKeyRaw = new Uint8Array(await crypto.subtle?.exportKey('raw', publicKey)).subarray(1);
    }
    async setCryptoKeyFromJwk(publicKey: JsonWebKey, privateKey: JsonWebKey): Promise<void> {
        this.setCryptoKey(
            await crypto.subtle?.importKey('jwk', publicKey, { name: 'ECDSA', namedCurve: 'P-256' }, true, ['verify']),
            await crypto.subtle?.importKey('jwk', privateKey, { name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign']));
    }

    getPublicKeyHex(delimiter = ''): string {
        if (!this.publicKeyRaw) throw new Error(ErrorMessage[ErrorCodes.EKEYISENC]);
        return Utils.toHex(this.publicKeyRaw, delimiter);
    }

    static async createKey(): Promise<Key> {
        const cryptoKey = await crypto.subtle?.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, true, ['sign', 'verify']);
        const key = new Key();
        await key.setCryptoKey(cryptoKey.publicKey, cryptoKey.privateKey);
        key.exportableKey = {
            publicKey: await crypto.subtle?.exportKey('jwk', cryptoKey.publicKey),
            privateKey: await crypto.subtle?.exportKey('jwk', cryptoKey.privateKey)
        };
        return key;
    }

    static async importKey(exported: ExportedKey): Promise<Key> {
        const key = new Key();
        key.exportableKey = exported;
        await key.setCryptoKeyFromJwk(key.exportableKey.publicKey, key.exportableKey.privateKey);
        return key;
    }

}