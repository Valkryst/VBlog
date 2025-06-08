const template = document.createElement('template');
template.innerHTML = `
<a href="/VBlog/posts.rss" target="_blank">
    <img src="/VBlog/resource/icon/rss.png" alt="RSS Icon">
    Subscribe to RSS Feed
</a>
`;

class PostsRSSLinkElement extends HTMLElement {
    constructor() {
        super();
        this.append(template.content.cloneNode(true));
    }
}

customElements.define("x-posts-rss-link", PostsRSSLinkElement);