import React from 'react';
import Avatar from './avatar';
import DateFormater from './date-formater';
import CoverImage from './cover-image';
import Link from 'next/link';
import Author from '../types/author';

type Props = {
    title: string
    coverImage: string
    date: string
    tags: string[]
    excerpt: string
    author: Author
    slug: string
};

const PostPreview = ({
    title,
    coverImage,
    date,
    tags,
    excerpt,
    author,
    slug
}: Props) => {
    return (
        <div>
            <div className="mb-5" style={{
                height: '10rem',
                overflow: 'hidden'
            }}>
                <CoverImage slug={slug} title={title} src={coverImage} />
            </div>
            <h3 className="text-3xl mb-3 leading-snug">
                <Link as={`/blog/posts/${slug}`} href="/blog/posts/[slug]">
                    <a className="hover:underline">{title}</a>
                </Link>
            </h3>
            <div className="mb-4 md:mb-0 text-lg pb-3">
                {
                    tags.map(tag => <Link as={`/blog/tags/${tag}`} href="/blog/tags/[label]" key={tag}>
                        <a className="inline-block bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#{tag}</a>
                    </Link>)
                }
            </div>
            <div className="text-lg mb-4">
                <DateFormater dateString={date} />
            </div>
            <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
            <Avatar name={`${author.firstname} ${author.lastname}`} picture={author.picture.url} />
        </div>
    );
};

export default PostPreview;
