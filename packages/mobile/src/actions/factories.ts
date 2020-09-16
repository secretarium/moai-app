import { Moai } from 'global';
import secretariumHandler from '../utils/secretariumHandler';
import {
    SECRETARIUM_TRANSACTION_EXECUTED,
    SECRETARIUM_TRANSACTION_PROPOSED,
    SECRETARIUM_TRANSACTION_ACKNOWLEDGED,
    SECRETARIUM_TRANSACTION_COMMITED
} from './types';

const subscriptionMap: { [key: string]: () => void } = {};
const responseTimes: { [key: string]: { q?: number; e?: number; r?: number }[] } = {};

export const requestFactory: Moai.RequestFactory = (command, args = {}, subscribe, ticker) => handlers => dispatch =>
    new Promise(resolve => {
        let tick = 0;     // changing let to const on autosave

        dispatch({
            type: command.REQUEST
        });

        const requestId = command.explicit ?? `${command.application}-${command.command}-${subscribe ? Object
            .values(args)
            .filter(arg => typeof arg === 'number' || typeof args === 'string')
            .map(arg => `${arg}`.replace(/[^\w]/g, ''))
            .reduce((previous, current, index) => {
                return `${previous}${index}${current}`;
            }, 'sub') : (new Date().getTime() * Math.random()).toString(16).slice(0, 8)}`;

        if (subscribe) {
            if (subscriptionMap[requestId]) {
                subscriptionMap[requestId]?.();
                delete subscriptionMap[requestId];
            }
            subscriptionMap[requestId] = () => resolve();
        }

        if (responseTimes[requestId] === undefined) {
            responseTimes[requestId] = [];
        }
        if (responseTimes[requestId].length > 200) {
            responseTimes[requestId].splice(0, 50);
        }
        responseTimes[requestId].push({ q: new Date().getTime() });

        secretariumHandler
            .request(command.application, command.command, subscribe ? { ...args, subscribe } : args, requestId)
            .then(query => {
                query
                    .onAcknowledged(() => {
                        if (handlers?.onAcknowledged) {
                            dispatch({
                                type: SECRETARIUM_TRANSACTION_ACKNOWLEDGED,
                                ...(handlers.onAcknowledged() ?? {})
                            });
                        }
                    })
                    .onProposed(() => {
                        if (handlers?.onProposed) {
                            dispatch({
                                type: SECRETARIUM_TRANSACTION_PROPOSED,
                                ...(handlers.onProposed() ?? {})
                            });
                        }
                    })
                    .onCommitted(() => {
                        if (handlers?.onCommitted) {
                            dispatch({
                                type: SECRETARIUM_TRANSACTION_COMMITED,
                                ...(handlers.onCommitted() ?? {})
                            });
                        }
                    })
                    .onExecuted((requestId: string) => {
                        responseTimes[requestId].push({ e: new Date().getTime() });
                        if (handlers?.onResult) {
                            dispatch({
                                type: SECRETARIUM_TRANSACTION_EXECUTED,
                                ...(handlers?.onExecuted?.() ?? {})
                            });
                        } else {
                            resolve({
                                type: command.SUCCESS,
                                ...(handlers?.onExecuted?.() ?? {})
                            });
                        }
                    })
                    .onResult((result: any, requestId: string) => {
                        responseTimes[requestId].push({ r: new Date().getTime() });
                        const outcome = handlers?.onResult?.(result) ?? {};
                        if (subscribe && !outcome.unsubscribe) {
                            dispatch({
                                type: command.SUCCESS,
                                payload: result,
                                ...outcome
                            }).then(() => {
                                if (ticker) {
                                    ticker(tick++);
                                }
                            });
                        } else {
                            delete subscriptionMap[requestId];
                            if (ticker) {
                                ticker(tick++);
                            }
                            resolve({
                                type: command.SUCCESS,
                                payload: result,
                                ...outcome
                            });
                        }
                    })
                    .onError((error: any) => {
                        const outcome = handlers?.onError?.(error) ?? { error: `Oops! The server replied: ${error}` };
                        if (subscribe && !outcome.unsubscribe)
                            dispatch({
                                type: command.FAILURE,
                                ...outcome
                            }).then(() => {
                                if (ticker)
                                    ticker(tick++, true);
                            });
                        else {
                            delete subscriptionMap[requestId];
                            if (ticker)
                                ticker(tick++, true);
                            resolve({
                                type: command.FAILURE,
                                ...outcome
                            });
                        }
                    })
                    .send();
            })
            .catch((error: any) => {
                const outcome = handlers?.onError?.(error) ?? { error : `Oops! The server replied: ${error}` };
                if (subscribe && !outcome.unsubscribe) {
                    dispatch({
                        type: command.FAILURE,
                        ...outcome
                    });
                } else {
                    delete subscriptionMap[requestId];
                    resolve({
                        type: command.FAILURE,
                        ...outcome
                    });
                }
            });
    });


