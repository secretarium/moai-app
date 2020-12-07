const gql = String.raw;

async function fetchAPI(query: string, { variables }: any = {}) {
    const res = await fetch('http://localhost:1337/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    })

    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }

    return json.data
}

export async function getPreviewPostBySlug(slug: any) {
    const data = await fetchAPI(
        gql`
        query PostBySlug($where: JSON) {
            posts(where: $where) {
                slug
            }
        }
        `,
        {
            variables: {
                where: {
                    slug,
                },
            },
        }
    )
    return data?.posts[0]
}

export async function getAllPostsForHome(preview: any) {
    const data = await fetchAPI(
        gql`
        query Posts($where: JSON) {
            posts(sort: "date:desc", limit: 10, where: $where) {
                title
                slug
                excerpt
                date
                tags {
                    label
                }
                coverImage {
                    url
                }
                author {
                    firstname
                    lastname
                    picture {
                        url
                    }
                }
            }
        }
        `,
        {
            variables: {
                where: {
                    ...(preview ? {} : { status: 'published' }),
                },
            },
        }
    )

    return data?.posts.map((post: any) => {
        post.tags = post.tags.map((tag: { label: string }) => tag.label.toLocaleLowerCase());
        return post;
    })
}

export async function getPostsByTag(label: any) {
    const data = await fetchAPI(
        gql`
        query PostsForTag($where: JSON) {
            tags(where: $where) {
                posts {
                    title
                    slug
                    excerpt
                    date
                    tags {
                        label
                    }
                    coverImage {
                        url
                    }
                    author {
                        firstname
                        lastname
                        picture {
                            url
                        }
                    }
                }
            }
        }
        `,
        {
            variables: {
                where: {
                    label
                }
            },
        }
    )

    return {
        posts: data.tags[0]?.posts.map((post: any) => {
            post.tags = post.tags.map((tag: { label: string }) => tag.label.toLocaleLowerCase());
            return post;
        }) || []
    }
}

export async function getPostAndMorePosts(slug: any, preview: any) {
    const data = await fetchAPI(
        gql`
        query PostBySlug($where: JSON, $where_ne: JSON) {
            posts(where: $where) {
                title
                slug
                content
                date
                tags {
                    label
                }
                coverImage {
                    url
                }
                author {
                    firstname
                    lastname
                    picture {
                        url
                    }
                }
            }

            morePosts: posts(sort: "date:desc", limit: 2, where: $where_ne) {
                title
                slug
                excerpt
                date
                tags {
                    label
                }
                coverImage {
                    url
                }
                author {
                    firstname
                    lastname
                    picture {
                        url
                    }
                }
            }
        }
        `,
        {
            preview,
            variables: {
                where: {
                    slug,
                    ...(preview ? {} : { status: 'published' }),
                },
                where_ne: {
                    ...(preview ? {} : { status: 'published' }),
                    slug_ne: slug,
                },
            },
        }
    )

    return {
        posts: data.posts.map((post: any) => {
            post.tags = post.tags.map((tag: { label: string }) => tag.label.toLocaleLowerCase());
            return post;
        }),
        morePosts: data.morePosts.map((post: any) => {
            post.tags = post.tags.map((tag: { label: string }) => tag.label.toLocaleLowerCase());
            return post;
        }),
    }
}
