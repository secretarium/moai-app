import React from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Container from '../../../components/container';
import Layout from '../../../components/layout';
import { getPostsByTag } from '../../../lib/api';
import PostTitle from '../../../components/post-title';
import Head from 'next/head';
import PostType from '../../../types/post';
import PostPreview from '../../../components/post-preview';

type Props = {
    tag: string;
    posts: PostType[]
};

const Tag = ({ tag, posts }: Props) => {
    const router = useRouter();
    if (!router.isFallback && !tag) {
        return <ErrorPage statusCode={404} />;
    }
    return (
        <Layout>
            <Container>
                {router.isFallback
                    ? (
                        <PostTitle>Loading…</PostTitle>
                    )
                    : (
                        <>
                            <article className="mb-32">
                                <Head>
                                    <title>
                                        #{tag} | Moai Blog
                                    </title>
                                </Head>
                                <PostTitle>#{tag}</PostTitle>
                                <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
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
                            </article>
                        </>
                    )}
            </Container>
        </Layout>
    );
};

export default Tag;

type Params = {
    params: {
        label: string
    }
};

export async function getServerSideProps({ params }: Params) {

    const data = await getPostsByTag(params.label);
    const posts = data.posts;

    return {
        props: {
            tag: params.label,
            posts
        }
    };
}