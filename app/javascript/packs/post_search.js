/** Shows and hides posts based on the user's search criteria. */
window.search = function search() {
    // Retrieve the filter elements and their data.
    const searchTextElement = document.getElementById("post-search-text");
    const searchCategoryElement = document.getElementById("post-search-category");

    const searchTextString = searchTextElement.value;
    const searchCategoryString = searchCategoryElement.options[searchCategoryElement.selectedIndex].value;


    // Show, or hide, all of the elements.
    if (searchTextString === "" && searchCategoryString === "") {
        showAllPostListings();
        return;
    }
    hideAllPostListings();


    // Perform the search and show elements that pass the filters.
    const postListingElements = document.getElementsByClassName("post-listing");
    const searchTextTerms = splitStringIntoTerms(searchTextString);

    for (let i = 0 ; i < postListingElements.length ; i++) {
        const postListing = postListingElements[i];

        let displayInSearchResults = false;

        if (searchTextTerms.length === 0) {
            // If the post isn't in the selected category, then omit it from the search results.
            const categoryElements = postListing.getElementsByClassName('post-category');

            for (let i = 0 ; i < categoryElements.length ; i++) {
                if (searchCategoryString === categoryElements[i].innerHTML) {
                    displayInSearchResults = true;
                    break;
                }
            }
        } else {
            displayInSearchResults |= filterByPostCategory(postListing, searchTextTerms);
            displayInSearchResults |= filterByPostTitle(postListing, searchTextTerms);
            displayInSearchResults |= filterByPostTags(postListing, searchTextTerms);
            displayInSearchResults |= filterByPostDescription(postListing, searchTextTerms);
        }

        if (displayInSearchResults) {
            postListing.style.display = "inherit";
        }
    }
}

window.searchFor = function searchFor(searchString) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    const searchTextElement = document.getElementById("post-search-text");
    const searchButtonElement = document.getElementById("post-search-button");

    searchTextElement.value = searchString;
    searchButtonElement.click();

}

/** Shows all post listings. */
function showAllPostListings() {
    const postListings = document.getElementsByClassName("post-listing");
    for (let i = 0 ; i < postListings.length ; i++) {
        postListings[i].style.display = "inherit";
    }
}

/** Hides all post listings. */
function hideAllPostListings() {
    const postListings = document.getElementsByClassName("post-listing");
    for (let i = 0 ; i < postListings.length ; i++) {
        postListings[i].style.display = "none";
    }
}

/**
 * Splits the given string into an array of lower-case words.
 *
 * @param string
 *        The input string.
 *
 * @returns {string[]}
 *          The string, as an array of lower-case words.
 */
function splitStringIntoTerms(string) {
    if (string.length === 0) {
        return [];
    }

    string = string.toLowerCase();
    string = string.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ");
    string = string.split(" ");
    return [...new Set(string)];
}

/**
 * Determines if there are any matching terms in the given arrays.
 *
 * @param termsA
 *        The first set of terms.
 *
 * @param termsB
 *        The second set of terms.
 *
 * @returns {boolean}
 *          Whether there are any matching terms in the given arrays.
 */
function anyTermsMatch(termsA, termsB) {
    if (termsA.length === 0 || termsB.length === 0) {
        return false;
    }

    let matchFound = false;
    termsA.some((searchTerm) => {
        if (termsB.includes(searchTerm)) {
            matchFound = true;
            return true;
        }
    });
    return matchFound;
}

/**
 * Determines whether the given post should be displayed in the search results,
 * by comparing the search terms to the content of the post's title.
 *
 * @param postListingElement
 *        The post element.
 *
 * @param searchTerms
 *        The search terms.
 *
 * @returns {boolean}
 *        Whether the given post should be displayed in the search results.
 */
function filterByPostTitle(postListingElement, searchTerms) {
    const titleElements = postListingElement.getElementsByClassName('post-title');

    if (titleElements.length > 0) {
        for (let i = 0; i < titleElements.length; i++) {
            const titleTerms = splitStringIntoTerms(titleElements[i].innerHTML);

            if (anyTermsMatch(searchTerms, titleTerms)) {
                return true;
            }
        }
    }

    return false;
}

/**
 * Determines whether the given post should be displayedi in the search results,
 * by comparing the search terms to the content of the post's description.
 *
 * @param postListingElement
 *        The post element.
 *
 * @param searchTerms
 *        The search terms.
 *
 * @returns {boolean}
 *        Whether the given post should be displayed in the search results.
 */
function filterByPostDescription(postListingElement, searchTerms) {
    const descriptionElements = postListingElement.getElementsByClassName('post-description');

    if (descriptionElements.length > 0) {
        for (let i = 0; i < descriptionElements.length; i++) {
            const descriptionTerms = splitStringIntoTerms(descriptionElements[i].innerHTML);

            if (anyTermsMatch(searchTerms, descriptionTerms)) {
                return true;
            }
        }
    }

    return false;
}

/**
 * Determines whether the given post should be displayed in the search results,
 * by comparing the search terms with content of the post's tags.
 *
 * @param postListingElement
 *        The post element.
 *
 * @param searchTerms
 *        The search terms.
 *
 * @returns {boolean}
 *        Whether the given post should be displayed in the search results.
 */
function filterByPostTags(postListingElement, searchTerms) {
    const tagElements = postListingElement.getElementsByClassName("post-tag");

    if (tagElements.length > 0) {
        for (let i = 0 ; i < tagElements.length ; i++) {
            const tagTerms = splitStringIntoTerms(tagElements[i].innerHTML);

            if (anyTermsMatch(searchTerms, tagTerms)) {
                return true;
            }
        }
    }

    return false;
}

/**
 * Determines whether the given post should be displayed in the search results,
 * by comparing the search terms with content of the post's category.
 *
 * @param postListingElement
 *        The post element.
 *
 * @param searchTerms
 *        The search terms.
 *
 * @returns {boolean}
 *        Whether the given post should be displayed in the search results.
 */
function filterByPostCategory(postListingElement, searchTerms) {
    const categoryElements = postListingElement.getElementsByClassName('post-category');

    if (categoryElements.length > 0) {
        for (let i = 0; i < categoryElements.length; i++) {
            const categoryString = categoryElements[i].innerHTML;
            if (categoryString.length === 0) {
                continue;
            }

            const categoryTerms = splitStringIntoTerms(categoryString);
            if (anyTermsMatch(searchTerms, categoryTerms)) {
                return true;
            }
        }
    }

    return false;
}