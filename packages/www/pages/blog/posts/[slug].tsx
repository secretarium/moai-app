import React from 'react';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Container from '../../../components/container';
import PostBody from '../../../components/post-body';
import PostHeader from '../../../components/post-header';
import Layout from '../../../components/layout';
import { getPostAndMorePosts } from '../../../lib/api';
import PostTitle from '../../../components/post-title';
import Head from 'next/head';
import markdownToHtml from '../../../lib/markdownToHtml';
import PostType from '../../../types/post';

type PostProps = {
    post: PostType
    morePosts: PostType[]
    preview?: boolean
};

const Post: React.FC<PostProps> = ({ post, preview }) => {
    const router = useRouter();
    if (!router.isFallback && !post?.slug) {
        return <ErrorPage statusCode={404} />;
    }
    return (
        <Layout preview={preview}>
            <Container>
                <article className="mb-32 p-8">
                    {router.isFallback
                        ? (
                            <PostTitle>Loading…</PostTitle>
                        )
                        : (
                            <>
                                <Head>
                                    <title>
                                        {post.title} | Moai Blog
                                    </title>
                                    <meta property="og:image" content={post.coverImage.url} />
                                </Head>
                                <PostHeader
                                    title={post.title}
                                    coverImage={post.coverImage.url}
                                    date={post.date}
                                    tags={post.tags}
                                    author={post.author}
                                />
                                <PostBody content={post.content} />
                            </>
                        )}
                </article>
            </Container>
        </Layout>
    );
};

export default Post;

type Params = {
    params: {
        slug: string
    }
    preview: any
};

export async function getServerSideProps({ params, preview = null }: Params) {
    const data = await getPostAndMorePosts(params.slug, preview);
    const content = await markdownToHtml(data?.posts[0]?.content || '');

    return {
        props: {
            preview,
            post: {
                ...data?.posts[0],
                content
            },
            morePosts: data?.morePosts
        }
    };
}