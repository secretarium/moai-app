import Author from './author';

type PostType = {
    slug: string
    title: string
    date: string
    tags: string[]
    coverImage: {
        url: string
    }
    author: Author
    excerpt: string
    content: string
};

export default PostType;
