const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="${import.meta.resolve('/element/posts/search_form/_.css')}">

<form id="posts-search-form" action="" method="get" onsubmit="return false;">
    <input id="post-search-text" type="text" spellcheck="true" list="post-search-text-datalist">
    <datalist id="post-search-text-datalist"></datalist>
    
    <select id="post-search-category" onchange="search()" autocomplete="off">
        <option value="">All Categories</option>
    </select>

    <div>
        <input id="post-search-button" type="submit" value="Search" onclick="search()">
        <input type="button" value="Clear" onclick="clearSearch()">
    </div>
</form>
`;

class PostsSearchFormElement extends HTMLElement {
    constructor() {
        super();
        this.append(template.content.cloneNode(true));
    }
}

customElements.define("x-posts-search-form", PostsSearchFormElement);