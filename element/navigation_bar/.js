const template = document.createElement('template');
template.innerHTML = `
<link rel="stylesheet" href="${import.meta.resolve('/element/navigation_bar/.css')}">
<nav>
    <a>☰</a>
    
    <section>
        <a href="/">
            <img src="/resource/icon/home.svg" alt="Home Icon">
            <p>Home</p>
        </a>
        
        <a href="/posts">
            <img src="/resource/icon/posts.svg" alt="Posts Icon">
            <p>Posts</p>
        </a>
    </section>
</nav>
`;

class NavigationBarElement extends HTMLElement {
    constructor() {
        super();
        this.append(template.content.cloneNode(true));

        /** Toggles the navigation bar. Expanding it if it's contracted, and contracting it if it's expanded. */
        this.getElementsByTagName("a")[0].addEventListener("click", () => {
            const sectionElement = this.getElementsByTagName("section")[0];

            if (this.isNavigationExpanded()) {
                this.contractNavigation(sectionElement);
                this.setAttribute("toggle_state", "contracted");
            } else {
                this.expandNavigation(sectionElement);
                this.setAttribute("toggle_state", "expanded");
            }
        });

        /** Contracts the navigation bar when the window is resized. */
        window.addEventListener("resize", () => {
            if (this.isNavigationExpanded()) {
                const sectionElement = this.getElementsByTagName("section")[0];

                this.contractNavigation(sectionElement);
                this.setAttribute("toggle_state", "contracted");
            }
        });

        /** Contracts the navigation bar when the user clicks outside of it, while it's expanded. */
        window.addEventListener("click", (event) => {
            if (this.isNavigationExpanded() && !this.contains(event.target)) {
                this.contractNavigation(this.getElementsByTagName("section")[0]);
                this.setAttribute("toggle_state", "contracted");
            }
        });
    }

    /**
     * Determines whether the navigation bar is expanded.
     *
     * @returns {boolean}
     *          Whether the navigation bar is expanded.
     */
    isNavigationExpanded() {
        return this.getAttribute("toggle_state") === "expanded";
    }

    /**
     * Contracts the navigation bar.
     *
     * @param sectionElement
     *        The section of the navigation bar to contract.
     */
    contractNavigation(sectionElement) {
        for (const link of sectionElement.getElementsByTagName("a")) {
            // The navigation toggle should be the only element with an onclick.
            if (link.onclick !== null) {
                continue;
            }

            link.style.display = "none";
        }
    }

    /**
     * Expands the navigation bar.
     *
     * @param sectionElement
     *        The section of the navigation bar to expand.
     */
    expandNavigation(sectionElement) {
        for (const link of sectionElement.getElementsByTagName("a")) {
            link.style.display = "inline";
        }
    }
}

customElements.define("x-navigation-bar", NavigationBarElement);