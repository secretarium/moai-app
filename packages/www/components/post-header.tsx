import React from 'react';
import Avatar from './avatar';
import DateFormater from './date-formater';
import CoverImage from './cover-image';
import PostTitle from './post-title';
import Author from '../types/author';
import Link from 'next/link';

type PostHeaderProps = {
    title: string
    coverImage: string
    date: string
    tags: string[]
    author: Author
};

const PostHeader: React.FC<PostHeaderProps> = ({
    title,
    coverImage,
    date,
    tags,
    author
}) => {
    return (
        <>
            <PostTitle>{title}</PostTitle>
            <div className="block mb-5 mt-0 md:mb-12 md:-mt-5">
                {
                    tags.map(tag => <Link as={`/blog/tags/${tag}`} href="/blog/tags/[label]" key={tag}>
                        <a className="inline-block bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1 md:text-xl font-semibold text-gray-700 mr-2">#{tag}</a>
                    </Link>)
                }
            </div>
            <div className="hidden md:block md:mb-5">
                <Avatar name={`${author.firstname} ${author.lastname}`} picture={author.picture.url} />
            </div>
            <div className="mb-8 md:mb-16 -mx-5 sm:mx-0">
                <CoverImage title={title} src={coverImage} />
            </div>
            <div className="max-w-2xl mx-auto">
                <div className="block md:hidden mb-6">
                    <Avatar name={`${author.firstname} ${author.lastname}`} picture={author.picture.url} />
                </div>
                <div className="mb-6 text-lg">
                    <DateFormater dateString={date} />
                </div>
            </div>
        </>
    );
};

export default PostHeader;
