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
 * @param sectionElement
 *        The section of the navigation bar to contract.
 */
function contractNavigation(sectionElement) {
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
function expandNavigation(sectionElement) {
    for (const link of sectionElement.getElementsByTagName("a")) {
        link.style.display = "inline";
    }
}

/**
 * Toggles the navigation bar. Expanding it if it's contracted, and contracting
 * it if it's expanded.
 */
window.toggleNavigation = function toggleNavigation() {
    const navElement = document.getElementsByTagName("nav")[0];
    const sectionElement = navElement.getElementsByTagName("section")[0];

    if (isNavigationExpanded()) {
        contractNavigation(sectionElement);
        navElement.setAttribute("toggleState", "contracted");
    } else {
        expandNavigation(sectionElement);
        navElement.setAttribute("toggleState", "expanded");
    }
}

window.addEventListener("resize", () => {
    if (isNavigationExpanded()) {
        const navElement = document.getElementsByTagName("nav")[0];
        const sectionElement = navElement.getElementsByTagName("section")[0];

        contractNavigation(sectionElement);
    }
});