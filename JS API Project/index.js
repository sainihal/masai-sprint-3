document.getElementById("about").addEventListener("click", navToAbout)
document.getElementById("history").addEventListener("click", navToHistory)

setTimeout(function () {
    document.getElementById("about").style.visibility = "visible"
    setTimeout(function () {
        document.getElementById("history").style.visibility = "visible"
    }, 100)
}, 100)

//sets location to about.html
function navToAbout() {
    location = "about.html"
}

//sets location to history.html
function navToHistory() {
    location = "history.html"
}