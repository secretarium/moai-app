import remark from 'remark'
import html from 'remark-html'
import all from 'mdast-util-to-hast/lib/all';

export default async function markdownToHtml(markdown: string) {
    const result = await remark().use(html, {
        sanitize: true,
        handlers: {
            heading: (h: any, node: any) => {
                const augmentedNode = {
                    ...node
                };
                return h(augmentedNode, 'h' + augmentedNode.depth, {
                    className: ['text-3xl']
                }, all(h, augmentedNode))
            }
        }
    }).process(markdown)
    return result.toString()
}
