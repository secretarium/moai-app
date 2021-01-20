import { actionTypes } from './constants';
import secretariumHandler from '../utils/secretariumHandler';

const subscriptionMap: { [key: string]: () => void } = {};
const responseTimes: { [key: string]: { q?: number; e?: number; r?: number }[] } = {};

export const requestFactory: Moai.RequestFactory = (command, args = {}, subscribe, ticker) => handlers => dispatch =>

    new Promise(resolve => {

        let tick = 0;

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


        if (command.application === '__local__' && command.command === '__systemClearSubscriptionsHook__')
            return Object.entries(subscriptionMap).forEach(([id, sub]) => {
                sub?.();
                delete subscriptionMap[id];
            });

        if (subscribe) {
            if (subscriptionMap[requestId])
                return resolve();
            subscriptionMap[requestId] = () => resolve();
        }

        if (responseTimes[requestId] === undefined)
            responseTimes[requestId] = [];
        if (responseTimes[requestId].length > 200)
            responseTimes[requestId].splice(0, 50);
        responseTimes[requestId].push({ q: new Date().getTime() });

        secretariumHandler
            .request(command.application, command.command, subscribe ? { ...args, subscribe } : args, requestId)
            .then(query => {
                query
                    .onAcknowledged(() => {
                        if (handlers?.onAcknowledged)
                            dispatch({
                                type: actionTypes.SECRETARIUM_TRANSACTION_ACKNOWLEDGED,
                                ...(handlers.onAcknowledged() ?? {})
                            });
                    })
                    .onProposed(() => {
                        if (handlers?.onProposed)
                            dispatch({
                                type: actionTypes.SECRETARIUM_TRANSACTION_PROPOSED,
                                ...(handlers.onProposed() ?? {})
                            });
                    })
                    .onCommitted(() => {
                        if (handlers?.onCommitted)
                            dispatch({
                                type: actionTypes.SECRETARIUM_TRANSACTION_COMMITED,
                                ...(handlers.onCommitted() ?? {})
                            });
                    })
                    .onExecuted((requestId: string) => {
                        responseTimes[requestId].push({ e: new Date().getTime() });
                        if (handlers?.onResult)
                            dispatch({
                                type: actionTypes.SECRETARIUM_TRANSACTION_EXECUTED,
                                ...(handlers?.onExecuted?.() ?? {})
                            });
                        else
                            resolve({
                                type: command.SUCCESS,
                                ...(handlers?.onExecuted?.() ?? {})
                            });
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
                                if (ticker)
                                    ticker(tick++);
                            });
                        }
                        else {
                            if (ticker)
                                ticker(tick++);
                            resolve({
                                type: command.SUCCESS,
                                payload: result,
                                ...outcome
                            });
                            delete subscriptionMap[requestId];
                        }
                    })
                    .onError((error: any) => {
                        const outcome = handlers?.onError?.(error) ?? { error: `Oops! The server replied: ${error}` };
                        if (subscribe && !outcome.unsubscribe) {
                            dispatch({
                                type: command.FAILURE,
                                ...outcome
                            }).then(() => {
                                if (ticker)
                                    ticker(tick++, true);
                            });
                        } else {
                            if (ticker)
                                ticker(tick++, true);
                            resolve({
                                type: command.FAILURE,
                                ...outcome
                            });
                            delete subscriptionMap[requestId];
                        }
                    })
                    .send();
            })
            .catch((error: any) => {
                const outcome = handlers?.onError?.(error) ?? { error: `Oops! The server replied: ${error}` };
                if (subscribe && !outcome.unsubscribe)
                    dispatch({
                        type: command.FAILURE,
                        ...outcome
                    });
                else {
                    delete subscriptionMap[requestId];
                    resolve({
                        type: command.FAILURE,
                        ...outcome
                    });
                }
            });
    });

const isDev = process.env.NODE_ENV === 'development';
if ((isDev || process.env.REACT_APP_MOAI_PRODUCTION_LOGGING === 'true') && window)
    (window as any)['moaiSubscriptions'] = subscriptionMap;
