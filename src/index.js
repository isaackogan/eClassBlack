/**
 * Perform essential functions on page load
 */
$(() => {

    // Change Icon
   addCustomIcon();

    // Get body
    const body =  $("body");

    // CSS Theme Load
    let themeElement = $(getThemeElement())
        .load("load", () => body.css("opacity", "1"))
        .attr("href", chrome.runtime.getURL("/public/styles/dark.css"));

    // Reset if none
    if (themeElement.get(0) == null) {
        body.css("transition-duration", "0ms")
        body.css("opacity", "1")
    }

    // Remove Banner
    removeBanner();

    // Remove custom colours if course page
    cleanCustomCourseColours("#region-main");
    cleanCustomCourseColours(".gtopics");

    // Add branding
    addBranding();
})


function addBranding() {

    const branding = $(
        "<div>" +
        "<a target='_blank' href='https://github.com/isaackogan/eClassBlack'>eClassBlack GitHub Page</a></div>"
    );

    branding.insertBefore($(".tool_usertours-resettourcontainer"))

}

function addCustomIcon() {
    $("link[rel='shortcut icon']")
        .attr("href", chrome.runtime.getURL("/public/images/favicon.ico"));
}

/**
 * Remove slideshow advertisement banner
 */
function removeBanner() {
    $("#inst2480330").remove();
}


/**
 * Clear custom colours, because they are made for light mode
 */
function cleanCustomCourseColours(selector) {

    const courseContent = $(selector);

    const jSpans = courseContent.find("span").toArray();
    const jStrongs = courseContent.find("strong").toArray();
    const jAs = courseContent.find("a").toArray();
    const jIs = courseContent.find("i").toArray();
    const jBs = courseContent.find("b").toArray();

    []
        .concat
        .apply([], [jSpans, jStrongs, jAs, jIs, jBs])
        .filter((jText) => Boolean(jText.style.color) || Boolean(jText.style.backgroundColor))
        .forEach((jText) => $(jText)
            .css("color", "var(--light1)")
            .css("background-color", "transparent")
        )

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
