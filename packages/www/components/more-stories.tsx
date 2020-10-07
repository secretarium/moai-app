import React from 'react';
import PostPreview from './post-preview';
import Post from '../types/post';

type Props = {
    posts: Post[]
};

const MoreStories = ({ posts }: Props) => {
    return (
        <section>
            <h2 className="mb-8 text-6xl md:text-7xl tracking-tighter leading-tight text-gray-500">
                Recently
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16 lg:gap-32 gap-20 mb-32">
                {posts.map((post) => (
                    <PostPreview
                        key={post.slug}
                        title={post.title}
                        coverImage={post.coverImage.url}
                        date={post.date}
                        tags={post.tags}
                        author={post.author}
                        slug={post.slug}
                        excerpt={post.excerpt}
                    />
                ))}
            </div>
        </section>
    );
};

export default MoreStories;
