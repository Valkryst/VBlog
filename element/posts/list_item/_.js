class PostsListItemElement extends HTMLElement {
    connectedCallback() {
        let innerHTML = `
            <link rel="stylesheet" href="${import.meta.resolve('/VBlog/element/posts/list_item/_.css')}">
            <script type="module" src="/VBlog/element/post/tag/_.js"></script>
        `;

        if (this.getId()) {
            innerHTML += `<a href="/VBlog/posts/${this.getId()}.html">`

            if (this.getTitle()) {
                innerHTML += `<h2>${this.getTitle()}</h2>`;
            }

            if (this.getDateTime()) {
                innerHTML += `<h3>Posted by Valkryst on <timestamp datetime="${this.getDateTime()}">${this.getDateTimeHumanized()}</timestamp></h3>`;
            }

            if (this.getDescription()) {
                innerHTML += `<p class="post-description">${this.getDescription()}</p>`;
            }

            innerHTML += '</a><div>';

            const category = this.getCategory();
            if (category) {
                innerHTML += `<button class="post-tag" onclick="searchForCategory(&quot;${category}&quot;)">${category}</button>`;
            }

            const tags = this.getTags();
            if (tags) {
                for (const tag of tags) {
                    innerHTML += `<button class="post-tag" onclick="searchForString(&quot;${tag}&quot;)">${tag}</button>`;
                }
            }

            innerHTML += `</div>`
        }

        this.innerHTML = innerHTML;
    }

    /**
     * Retrieves the category attribute.
     *
     * @returns {string|undefined} Value of the category attribute, or undefined if not found.
     */
    getCategory() {
        const value = this.getAttribute('category');
        if (!value) {
            console.error("No `category` attribute found.");
            return undefined;
        }

        return value.trim();
    }

    /**
     * Retrieves the datetime attribute.
     *
     * @returns {string|undefined} Value of the datetime attribute, or undefined if not found.
     */
    getDateTime() {
        const value = this.getAttribute('datetime');
        if (!value) {
            console.error("No `datetime` attribute found.");
            return undefined;
        }

        return value.trim();
    }

    /**
     * Retrieves a humanized datetime attribute.
     *
     * @returns {string|undefined} Humanized value of the datetime attribute, or undefined if not found.
     */
    getDateTimeHumanized() {
        const value = this.getDateTime();
        if (value === undefined) {
            return undefined;
        }

        // It appears as though Date uses a zero-indexed day, so we need to increment it to get the correct day.
        const date = new Date(value);
        date.setDate(date.getDate() + 1);

        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    /**
     * Retrieves the description attribute.
     *
     * @returns {string|undefined} Value of the description attribute, or undefined if not found.
     */
    getDescription() {
        const value = this.getAttribute('description');
        if (!value) {
            console.error("No `description` attribute found.");
            return undefined;
        }

        return value.trim();
    }

    /**
     * Retrieves the id attribute.
     *
     * @returns {string|undefined} Value of the id attribute, or undefined if not found.
     */
    getId() {
        const value = this.getAttribute('id');
        if (!value) {
            console.error("No `id` attribute found.");
            return undefined;
        }

        return value.trim();
    }

    /**
     * Retrieves the tags attribute, splitting it into an array.
     *
     * @returns {undefined|string[]} Array of tags, or undefined if not found.
     */
    getTags() {
        const value = this.getAttribute('tags');
        if (!value) {
            console.error("No `tags` attribute found.");
            return undefined;
        }

        return value.split(',').map(tag => tag.trim());
    }

    /**
     * Retrieves the title attribute.
     *
     * @returns {string|undefined} Value of the title attribute, or undefined if not found.
     */
    getTitle() {
        const value = this.getAttribute('title');
        if (!value) {
            console.error("No `title` attribute found.");
            return undefined;
        }

        return value.trim();
    }
}

customElements.define("x-posts-list-item", PostsListItemElement);