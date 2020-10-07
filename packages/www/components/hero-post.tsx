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

const HeroPost = ({
    title,
    coverImage,
    date,
    tags,
    excerpt,
    author,
    slug
}: Props) => {

    return (
        <section>
            <div className="mb-8 md:mb-16">
                <CoverImage title={title} src={coverImage} slug={slug} />
            </div>
            <div className="md:grid md:grid-cols-2 gap-16 lg:gap-32 mb-20 md:mb-28">
                <div>
                    <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
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
                    <div className="mb-4 md:mb-0 text-lg">
                        <DateFormater dateString={date} />
                    </div>
                </div>
                <div>
                    <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
                    <Avatar name={`${author.firstname} ${author.lastname}`} picture={author.picture.url} />
                </div>
            </div>
        </section>
    );
};

export default HeroPost;
