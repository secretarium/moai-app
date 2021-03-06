import { AnyAction as ReduxAnyAction } from 'redux';
import { MapStateToProps, TypedUseSelectorHook } from 'react-redux';
import { EncryptedKeyPair } from '@secretarium/connector';


declare namespace MoaiPortal {
    interface FunctionAction {
        (dispatch: Dispatch, getState: () => State): any;
    }

    type ErrorObject = {
        errorCode: string | number;
        errorMessage: string,
        errorDescription?: string,
        errorTimestamp: string | number;
        errorStack?: Array<ErrorObject>;
    };

    interface AnyAction extends ReduxAnyAction {
        payload?: any;
        error?: Error | ErrorObject;
        workload?: FunctionAction;
        unsubscribe?: boolean;
    }

    interface RequestFactory {
        (command: QueryCommand & ActionTypeDecoration, args?: { [key: string]: any }, subscribe?: boolean, ticker?: (index: number, error?: boolean) => any): (handlers?: QueryHandlers) => (dispatch: Dispatch) => Promise<AnyAction | void>;
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

    type EncKeyPair = {
        version: number;
        iv: string;
        salt: string;
        data: string;
    };

    type Vault = {
        keyPairs: EncryptedKeyPair[];
    };

    type Principal = {
        isConnected: boolean;
        group: number;
        groupMembers: Tracer[];
        isAdmin?: boolean;
        loginError?: string;
        registrationError?: string;
    };

    type Tracer = {
        tracer: { username: string };
        userId: number;
        status: number;
        date: number;
    };

    type SearchResults = {
        isFetching: boolean;
        tested: User;
        exposed: User[];
        searchTestedError?: string;
        searchExposedError?: string;
    };

    type User = {
        userId: string;
        time: number;
    };

    type Conversation = {
        address: string;
        token: string;
    };

    type Message = {
        datetime: number;
        sender: number;
        text: string;
        received: number;
        read: number;
    };

    type LastMessage = {
        address: string;
        lastMessage: Message;
    };

    type Conversations = {
        isFetching: boolean;
        conversationList: Conversation[];
        lastMessages: LastMessage[];
        messages: Message[];
        newConversation: Conversation;
        messageError?: string;
    };

    type RequestRecords = {
        type: number;
        date: number;
        forecastedEndDate: number;
        registerer: string;
        registrationDate: number;
    };

    type Certificates = {
        isFetching: boolean;
        requesters: string[];
        requestRecords: RequestRecords[];
    };

    type State = {
        system: System;
        principal: Principal;
        conversations: Conversations;
        searchResults: SearchResults;
        certificates: Certificates;
        vault: Vault;
    };

}

declare module 'react-router-dom' {
    interface LinkProps {
        underlayColor?: string;
    }
}

export = MoaiPortal;
export as namespace MoaiPortal;