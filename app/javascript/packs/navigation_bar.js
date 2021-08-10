/**
 * Determines whether the navigation bar is expanded.
 *
 * @returns {boolean}
 *          Whether the navigation bar is expanded.
 */
function isNavigationExpanded() {
    const navElement = document.getElementsByTagName("nav")[0];
    return navElement.getAttribute("toggleState") === "expanded";
}

/**
 * Contracts the navigation bar.
 *
 * @param navElement
 *        The navigation bar.
 */
function contractNavigation(navElement) {
    navElement.style.width = "";

    for (const link of navElement.getElementsByTagName("a")) {
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
 * @param navElement
 *        The navigation bar.
 */
function expandNavigation(navElement) {
    for (const link of navElement.getElementsByTagName("a")) {
        link.style.display = "inline";
    }
}

/**
 * Toggles the navigation bar. Expanding it if it's contracted, and contracting
 * it if it's expanded.
 */
window.toggleNavigation = function toggleNavigation() {
    const navElement = document.getElementsByTagName("nav")[0];

    if (isNavigationExpanded()) {
        contractNavigation(navElement);
        navElement.setAttribute("toggleState", "contracted");
    } else {
        expandNavigation(navElement);
        navElement.setAttribute("toggleState", "expanded");
    }
}

window.addEventListener("resize", () => {
    if (isNavigationExpanded()) {
        contractNavigation(document.getElementsByTagName("nav")[0])
    }
});