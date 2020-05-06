document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    const category = urlParams.get("category");

    if (search !== null) {
        searchForString(search);
    }

    if (category !== null) {
        searchForCategory(category);
    }
}, false);

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

        // If the post isn't in the selected category, then omit it from the search results.
        if (searchCategoryString.length > 0) {
            const categoryElement = getPostListingCategory(postListing);
            if (searchCategoryString !== categoryElement.innerHTML.trim()) {
                continue;
            }
        }

        if (searchTextTerms.length !== 0) {
            let displayInSearchResults = false;
            displayInSearchResults |= filterByPostCategory(postListing, searchTextTerms);
            displayInSearchResults |= filterByPostTitle(postListing, searchTextTerms);
            displayInSearchResults |= filterByPostTags(postListing, searchTextTerms);
            displayInSearchResults |= filterByPostDescription(postListing, searchTextTerms);

            if (!displayInSearchResults) {
                continue;
            }
        }


        postListing.style.display = "inherit";
    }
}

/**
 * Enters the given string in the search field and performs a search.
 *
 * @param string
 *        The string to search for.
 */
window.searchForString = function searchForString(string) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    const searchTextElement = document.getElementById("post-search-text");
    const searchButtonElement = document.getElementById("post-search-button");

    searchTextElement.value = string;
    searchButtonElement.click();
}

/**
 * Selects the given category from the dropdown and performs a search.
 *
 * @param categoryName
 *        The category to search for.
 */
window.searchForCategory = function searchForCategory(categoryName) {
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    const searchCategoryElement = document.getElementById("post-search-category");
    const searchButtonElement = document.getElementById("post-search-button");

    searchCategoryElement.value = categoryName;
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

    string = string.trim();
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
    const titleElement = getPostListingTitle(postListingElement);
    if (titleElement === null) {
        return false;
    }

    const titleTerms = splitStringIntoTerms(titleElement.innerHTML);
    return anyTermsMatch(searchTerms, titleTerms);
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
    const descriptionElement = getPostListingDescription(postListingElement);
    if (descriptionElement === null) {
        return false;
    }

    const descriptionTerms = splitStringIntoTerms(descriptionElement.innerHTML);
    return anyTermsMatch(searchTerms, descriptionTerms);
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
    const tagElements = getPostListingTags(postListingElement);

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
    const categoryElement = getPostListingCategory(postListingElement);
    if (categoryElement === null) {
        return false;
    }

    const categoryTerms = splitStringIntoTerms(categoryElement.innerHTML);
    return anyTermsMatch(searchTerms, categoryTerms);
}

/**
 * Retrieves the title element of a post listing.
 *
 * @param postListingElement
 *        The post listing.
 *
 * @returns {Element}
 *        The title element.
 */
function getPostListingTitle(postListingElement) {
    const titleElements = postListingElement.getElementsByClassName('post-title');
    return (titleElements.length === 0) ? null : titleElements[0];
}

/**
 * Retrieves the description element of a post listing.
 *
 * @param postListingElement
 *        The post listing.
 *
 * @returns {Element}
 *        The description element.
 */
function getPostListingDescription(postListingElement) {
    const descriptionElements = postListingElement.getElementsByClassName('post-description');
    return (descriptionElements.length === 0) ? null : descriptionElements[0];
}

/**
 * Retrieves the category element of a post listing.
 *
 * @param postListingElement
 *        The post listing.
 *
 * @returns {Element}
 *        The category element.
 */
function getPostListingCategory(postListingElement) {
    const categoryElements = postListingElement.getElementsByClassName('post-category');
    return (categoryElements.length === 0) ? null : categoryElements[0];
}

/**
 * Retrieves the tag elements of a post listing.
 *
 * @param postListingElement
 *        The post listing.
 *
 * @returns {*}
 *        The tag elements.
 */
function getPostListingTags(postListingElement) {
    return postListingElement.getElementsByClassName("post-tag");
}