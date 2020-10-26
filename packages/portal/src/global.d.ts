import { AnyAction as ReduxAnyAction } from 'redux';
import { MapStateToProps, TypedUseSelectorHook } from 'react-redux';
import { Key } from '@secretarium/moai-connect';

declare namespace MoaiPortal {
    interface FunctionAction {
        (dispatch: Dispatch, getState: () => State): any;
    }

    interface AnyAction extends ReduxAnyAction {
        payload?: any;
        workload?: FunctionAction;
        unsubscribe?: boolean;
    }

    interface RequestFactory {
        (command: QueryCommand & ActionTypeDecoration, args?: { [key: string]: any }, subscribe?: boolean, ticker?: (index: number, error?: boolean) => any): (handlers?: QueryHandlers) => (dispatch: Dispatch) => Promise<AnyAction>;
    }

    interface Dispatch {
        (action: AnyAction | Promise<AnyAction> | FunctionAction): Promise<AnyAction>;
    }

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
        currentConnection?: SystemConnection;
        log: SystemLog;
    };

    type Principal = {
        isConnected: boolean;
        isFetching: boolean;
        localKey?: Key;
    };

    type Conversation = {
        id: number;
        endpoint: string;
        token: number;
    };

    type User = {
        [id: number];
    };

    type Message = {
        time: number;
        text: string;
        sender: number;
        hasRead: [User, User];
    };

    type State = {
        system: System;
        principal: Principal;
    };

}

declare module 'react-router-dom' {
    interface LinkProps {
        underlayColor?: string;
    }
}

export = MoaiPortal;
export as namespace MoaiPortal;