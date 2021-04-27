import React, { useState, useEffect, ReactElement, Fragment } from 'react';
import style from './StatusBar.module.css';
import { LoadingOutlined, DeploymentUnitOutlined, WarningOutlined } from '@ant-design/icons';
import { withState } from '../../store';
import { version as packageVersion } from '../../../package.json';
//import { reconnectNow } from '../actions';

const StatusBar = withState()(
    (s) => ({
        currentConnection: s.system?.currentConnection
    }),
    ({ currentConnection }) => {

        const [retryTimeLeft, setRetryTimeLeft] = useState(Math.floor(((currentConnection?.nextTry ?? 0) - new Date().getTime()) / 1000));
        const currentlyLoading: ReactElement[] = [];

        useEffect(() => {
            if (currentConnection?.isInterrupted && !currentConnection?.isReconnectionPaused)
                setTimeout(() => {
                    setRetryTimeLeft(Math.floor(((currentConnection?.nextTry ?? 0) - new Date().getTime()) / 1000));
                }, 1000);
        });

        return (
            <div className={`${style.bar} ${currentConnection?.isInterrupted ? style.alert : ''}`}>
                {currentConnection?.isInterrupted
                    ? retryTimeLeft <= 0 && !currentConnection?.isReconnectionPaused
                        ? (
                            <>
                                <LoadingOutlined />
                                &nbsp;&nbsp;&nbsp;Reconnecting to {currentConnection?.cluster} ...
                            </>
                        )
                        : (
                            <>
                                <WarningOutlined />
                                    &nbsp;&nbsp;&nbsp;Connection to {currentConnection?.cluster} lost!&nbsp;
                                {currentConnection?.isReconnectionPaused ? null : <>Retrying in {retryTimeLeft}s.&nbsp;</>}
                                <a
                                    href="./#"
                                    onClick={e => {
                                        e.preventDefault();
                                        //dispatch(reconnectNow());
                                    }}
                                    style={{
                                        color: 'white',
                                        fontWeight: 'bold'
                                    }}>
                                    Reconnecting now...
                                </a>
                            </>
                        )
                    : <>
                        <DeploymentUnitOutlined />
                            &nbsp;&nbsp;&nbsp;Connected to {currentConnection?.cluster} via {currentConnection?.gateway}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {currentlyLoading.length
                            ? (
                                <>
                                    <LoadingOutlined />
                                &nbsp;&nbsp;{currentlyLoading.map((element, index) => <Fragment key={index}>{element}{index < currentlyLoading.length - 1 ? ',' : ''}&nbsp;</Fragment>)} ...
                                </>
                            )
                            : null}
                    </>
                }

                <span className={style.credits}>
                    Moai © {new Date().getFullYear()} - Powered by{' '}
                    <a href="https://secretarium.com" rel="noopener noreferrer" target="_blank">
                        Secretarium
                    </a> - <em>{`v${packageVersion}`}</em>
                </span>
            </div>
        );
    }
);

export default StatusBar;
