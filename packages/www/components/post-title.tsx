import React from 'react';

const PostTitle: React.FC = ({ children }) => {
    return (
        <section className="flex-col md:flex-row flex items-center md:justify-between mt-20 mb-8 md:mb-12">
            <h1 className="text-6xl md:text-7xl tracking-tighter leading-tight md:pr-8">
                {children}
            </h1>
        </section>
    );
};

export default PostTitle;
