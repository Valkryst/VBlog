/**
 * Determines whether the navigation bar is expanded.
 *
 * @returns {boolean}
 *          Whether the navigation bar is expanded.
 */
function isNavigationExpanded() {
    const element = document.getElementsByTagName("nav")[0];
    return element.style.width === ((screen.width <= 1080) ? "100%" : "14rem");
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
        for (const p of link.getElementsByTagName("p")) {
            p.style.display = "";
        }
    }

    navElement.getElementsByTagName("a")[0].innerHTML = "&gt;";
}

/**
 * Expands the navigation bar.
 *
 * @param navElement
 *        The navigation bar.
 */
function expandNavigation(navElement) {
    navElement.style.width = ((screen.width <= 1080) ? "100%" : "14rem");

    for (const link of navElement.getElementsByTagName("a")) {
        for (const p of link.getElementsByTagName("p")) {
            p.style.display = "inline";
        }
    }

    navElement.getElementsByTagName("a")[0].innerHTML = "&times;";
}

/**
 * Toggles the navigation bar. Expanding it if it's contracted, and contracting
 * it if it's expanded.
 */
window.toggleNavigation = function toggleNavigation() {
    const navElement = document.getElementsByTagName("nav")[0];
    if (isNavigationExpanded()) {
        contractNavigation(navElement);
    } else {
        expandNavigation(navElement);
    }
}

window.addEventListener("resize", () => {
    if (isNavigationExpanded()) {
        contractNavigation(document.getElementsByTagName("nav")[0])
    }
});