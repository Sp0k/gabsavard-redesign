import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context) {
  const posts = await getCollection("posts");
  return rss({
    title: "GS | RSS",
    description: "If you really like my work, come check out my portfolio",
    site: context.site,
    trailingSlash: false,
    stylesheet: "/rss/pretty-feed-v3.xsl",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),
      ...post.data,
    })),
    customData: `<language>en-us</language>`,
  });
}
