import React, { useEffect, useState } from 'react';
import './Body.css';
import { withState } from '../../store';
import { generateLocalKey } from '../../actions/secretarium';

const Body = withState()(
    (s) => ({
        localKey: s.principal.localKey
    }),
    ({ dispatch, localKey, children }) => {

        const [hasRequestedLocalKey, setHasRequestedLocalKey] = useState(false);
        const [hasObtainedLocalKey, setHasObtainedLocalKey] = useState(false);

        useEffect(() => {
            if (!localKey && !hasRequestedLocalKey) {
                setHasRequestedLocalKey(true);
                dispatch(generateLocalKey()).then(() => {
                    setHasObtainedLocalKey(true);
                    console.log(localKey);
                });
            } else if (localKey) {
                setHasObtainedLocalKey(true);
                dispatch(generateLocalKey()).then(() => {
                    setHasObtainedLocalKey(true);
                    console.log(localKey);
                });
            }
        }, []);

        if (!hasObtainedLocalKey)
            return <div>Loading local key...</div>;

        return (
            <div>
                {children}
            </div>
        );
    }
);

export default Body;
