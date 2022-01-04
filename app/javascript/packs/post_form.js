/** Retrieves the HTML post body and displays it below the post form. */
window.previewPost = function previewPost() {
    const postBody = document.getElementById("post_body_html");
    document.getElementById("post-preview").innerHTML = postBody.value;
}