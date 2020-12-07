import React from 'react';
import Container from './container';
import cn from 'classnames';

type AlertProps = {
    preview?: boolean
};

const Alert: React.FC<AlertProps> = ({ preview }) => {
    return (
        <Container>
            {preview ? (
                <div
                    className={cn('border-b', {
                        'bg-accent-7 border-accent-7 text-white': preview,
                        'bg-accent-1 border-accent-2': !preview
                    })}
                >
                    <div className="py-2 text-center text-sm">
                        This is page is a preview.{' '}
                        <a
                            href="/api/exit-preview"
                            className="underline hover:text-cyan duration-200 transition-colors"
                        >Click here</a>{' '}to exit preview mode.
                    </div>
                </div>
            ) : null}
        </Container>
    );
};

export default Alert;
