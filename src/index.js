/**
 * Perform essential functions on page load
 */
$(() => {

    // CSS Theme Load
    let themeElement = $(getThemeElement())
        .load("load", () => $("body").css("opacity", "1"))
        .attr("href", chrome.runtime.getURL("/styles/dark.css"));

    // Remove Banner
    removeBanner();

    // Remove custom colours if course page
    cleanCustomCourseColours();

    // If it didn't happen...
    setTimeout(() => {
        themeElement.css("opacity", "1");
    }, 2500)

})


/**
 * Remove slideshow advertisement banner
 */
function removeBanner() {
    $("#inst2480330").remove();
}


/**
 * Clear custom colours, because they are made for light mode
 */
function cleanCustomCourseColours() {

    const courseContent = $("#region-main");

    const jSpans = courseContent.find("span").toArray();
    const jStrongs = courseContent.find("strong").toArray();
    const jAs = courseContent.find("a").toArray();
    const jIs = courseContent.find("i").toArray();

    []
        .concat
        .apply([], [jSpans, jStrongs, jAs, jIs])
        .filter((jText) => Boolean(jText.style.color))
        .forEach((jText) => $(jText).css("color", "var(--light1)"))

}

/**
 * Get the <link/> element containing the eClass theme
 */
function getThemeElement() {

    for (let jElement of $("head").children("link").toArray()) {

        if (jElement.href.includes("styles.php") && jElement.href.includes("/all")) {
            return jElement;
        }

    }

}
