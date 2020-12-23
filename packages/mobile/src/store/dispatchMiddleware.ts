import { Middleware } from 'redux';

export const secretariumMiddleware: Middleware = ({ dispatch, getState }) => next => async action => {

    const unfold = async (action: any): Promise<any> => {

        let start;
        console.log(action);
        if (typeof action === 'function')
            start = action(dispatch, () => getState?.()?.toJS?.());
        else
            start = action;

        let future;
        try {
            future = start instanceof Promise ? await start : start;
        } catch (error) {
            future = error;
        }

        if (future?.type === undefined)
            return;

        next(future);

        if (future.workload !== undefined && typeof future.workload === 'function')
            return unfold(future.workload);
    };

    return unfold(action);
};

export default secretariumMiddleware;