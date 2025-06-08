class CodeBlockElement extends HTMLElement {
    static _hljsVersion = "11.11.1";
    #code;

    constructor() {
        super();
        this.#code = this.#normalizeIndentation(this.innerHTML);
    }

    connectedCallback() {
        this.innerHTML = '';

        const language = this.getLanguage();
        if (language) {
            this.appendChild(this.getHighlightStyleSheetElement());
            this.appendChild(this.getHighlightLanguageStyleSheetElement());

            if (this.#code) {
                const codeElement = document.createElement('code');
                codeElement.className = `language-${language}`;
                codeElement.textContent = this.#code;

                const preElement = document.createElement('pre');
                preElement.appendChild(codeElement);
                this.appendChild(preElement);

                this.#loadScript(`https://unpkg.com/@highlightjs/cdn-assets@${CodeBlockElement._hljsVersion}/highlight.min.js`)
                    .then(() => {
                        return this.#loadScript(`https://unpkg.com/@highlightjs/cdn-assets@${CodeBlockElement._hljsVersion}/languages/${language}.min.js`)
                            .then(() => {
                                if (window.hljs) {
                                    window.hljs.highlightElement(codeElement);
                                }
                            })
                            .catch(error => console.error('Error loading HLJS language script:', error));
                    })
                    .catch(error => {
                        console.error('Error loading HLJS script:', error);
                    });
            }
        }
    }

    /**
     * Loads a script and returns a promise that resolves when the script is loaded
     *
     * @param {string} src Script source URL
     * @returns {Promise<void>} Promise that resolves when script is loaded
     */
    #loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve();
            script.onerror = (e) => reject(e);
            this.appendChild(script);
        });
    }

    /**
     * Normalizes indentation by finding the minimum amount of leading whitespace and removing it from all lines to
     * preserve proper code indentation. Also removes leading and trailing empty lines.
     *
     * @param {string} text Text to normalize
     * @returns {string} Normalized text, with proper indentation and without leading/trailing empty lines
     */
    #normalizeIndentation(text) {
        if (!text || text.trim().length === 0) {
            return '';
        }

        // Split into lines and remove any leading empty lines
        const lines = text.split('\n');
        while (lines.length > 0 && lines[0].trim() === '') {
            lines.shift();
        }

        // Remove any trailing empty lines
        while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
            lines.pop();
        }

        const nonEmptyLines = lines.filter(line => line.trim().length > 0);
        if (nonEmptyLines.length === 0) {
            return '';
        }

        // Find the minimum indentation level
        const minIndent = Math.min(...nonEmptyLines.map(line => {
            const match = line.match(/^\s*/);
            return match ? match[0].length : 0;
        }));

        // Remove the minimum indentation from each line
        return lines.map(line => {
            // Only remove indentation if the line has content
            return line.trim() ? line.substring(minIndent) : line.trim();
        }).join('\n');
    }

    /**
     * Retrieves the language attribute.
     *
     * @returns {string|undefined} Value of the language attribute, or undefined if not found.
     */
    getLanguage() {
        const value = this.getAttribute('language');
        if (!value) {
            console.error("No `language` attribute found.");
            return undefined;
        }

        return value.trim().toLowerCase();
    }

    /**
     * Constructs and returns a link element for the highlight.js stylesheet.
     *
     * @returns {HTMLLinkElement} Link element for the highlight.js stylesheet.
     */
    getHighlightStyleSheetElement() {
        const element = document.createElement('link');
        element.rel = 'stylesheet';
        element.href = `https://unpkg.com/@highlightjs/cdn-assets@${CodeBlockElement._hljsVersion}/styles/default.min.css`;
        return element;
    }

    /**
     * Constructs and returns a link element for the highlight.js language-specific stylesheet.
     *
     * @returns {HTMLLinkElement} Link element for the highlight.js language-specific stylesheet.
     */
    getHighlightLanguageStyleSheetElement() {
        const element = document.createElement('link');
        element.rel = 'stylesheet';
        element.href = `https://unpkg.com/@highlightjs/cdn-assets@${CodeBlockElement._hljsVersion}/styles/${this.getLanguage()}.min.css`;
        return element;
    }
}

customElements.define("x-code-block", CodeBlockElement);