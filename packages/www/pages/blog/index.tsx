import React from 'react';
import Container from '../../components/container';
import MoreStories from '../../components/more-stories';
import HeroPost from '../../components/hero-post';
import Layout from '../../components/layout';
import { getAllPostsForHome } from '../../lib/api';
import Head from 'next/head';
import Post from '../../types/post';
import PostTitle from '../../components/post-title';

type IndexProps = {
    allPosts: Post[]
};

const Index: React.FC<IndexProps> = ({ allPosts }) => {
    const heroPost = allPosts[0];
    const morePosts = allPosts.slice(1);

    return (
        <Layout>
            <Head>
                <title>Moai Blog</title>
            </Head>
            <Container>
                <PostTitle>Latest</PostTitle>
                {heroPost && (
                    <HeroPost
                        title={heroPost.title}
                        coverImage={heroPost.coverImage.url}
                        date={heroPost.date}
                        tags={heroPost.tags}
                        author={heroPost.author}
                        slug={heroPost.slug}
                        excerpt={heroPost.excerpt}
                    />
                )}
                {morePosts.length > 0 && <MoreStories posts={morePosts} />}
            </Container>
        </Layout>
    );
};

export default Index;

export async function getServerSideProps({ preview = null }) {
    const allPosts = (await getAllPostsForHome(preview)) || [];
    return {
        props: { allPosts, preview }
    };
}
