import { AnyAction as ReduxAnyAction } from 'redux';
import { MapStateToProps, TypedUseSelectorHook } from 'react-redux';

declare namespace Moai {
    interface FunctionAction {
        (dispatch: Dispatch, getState: () => State): any;
    }

    interface AnyAction extends ReduxAnyAction {
        payload?: any;
        workload?: FunctionAction;
        unsubscribe?: boolean;
    }

    interface Uint8Array extends Uint8ArrayConstructor {
        secFromBase64(key: string, url?: boolean): Uint8Array;
        secToBase64(url?: boolean);
    }

    interface RequestFactory {
        (command: QueryCommand & ActionTypeDecoration, args?: { [key: string]: any }, subscribe?: boolean, ticker?: (index: number, error?: boolean) => any): (handlers?: QueryHandlers) => (dispatch: Dispatch) => Promise<AnyAction>;
    }

    interface Dispatch {
        (action: AnyAction | Promise<AnyAction> | FunctionAction): Promise<AnyAction>;
    }

    type KeyPair = {
        id: string;
        version?: string;
        name: string;
        iv: string;
        salt: string;
        encryptedKeyPair: string;
    };

    type QueryCommand = {
        application: string;
        command: string;
        explicit?: string;
        args?: any;
    };

    type ActionTypeDecoration = { REQUEST: string; SUCCESS: string; FAILURE: string };

    type DecoratedActionTypeMap<T> = {
        [P in keyof T]: { P: T[P] } & ActionTypeDecoration;
    };

    type DecoratedCommandTypeMap<T> = {
        [P in keyof T]: T[P] & ActionTypeDecoration;
    };

    type QueryHandlers = {
        onAcknowledged?: NaiveHandler;
        onProposed?: NaiveHandler;
        onCommitted?: NaiveHandler;
        onExecuted?: NaiveHandler;
        onResult?: ResultHandler;
        onError?: ErrorHandler;
    };

    interface DispatchProp {
        dispatch: Dispatch;
    }

    interface StateCurry<R> {
        <O = unknown>(): (<S = Record<string, unknown>>(propsMapper: MapStateToProps<S, O, ReturnType<R>> | null, component: React.FC<O & S & DispatchProp>) => React.FC<O & Partial<S>>);
    }

    type StateSelector = TypedUseSelectorHook<State>;

    interface StoreComponentMigrator<T = any> {
        (state: T): T;
    }

    interface StoreComponent<T, A = any> {
        (state: T | undefined, action: AnyAction<A>): T;
    }

    type SystemConfiguration = {
        theme: 'light' | 'dark' | 'auto';
    };

    type SystemConnection = {
        isInterrupted?: boolean;
        isForcedClosed?: boolean;
        isReconnectionPaused?: boolean;
        interruptionCount: number;
        nextTry?: number;
        cluster?: string;
        gateway?: string;
        endpoint?: string;
        error?: Error;
    };

    type LogEntry = {
        type: string;
        time: number;
        payload: Array<string>;
        hadWorkload?: boolean;
    };

    type SystemLog = LogEntry[];

    type System = {
        version: string;
        localConfiguration: SystemConfiguration;
        localKey?: KeyPair;
        currentConnection?: SystemConnection;
        isFirstUserStart: boolean;
        log: SystemLog;
    };

    type State = {
        system: System;
    };
}

export = Moai;
export as namespace Moai;