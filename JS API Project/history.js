document.getElementById("home").addEventListener("click", navToHome)

var historyURL = "https://api.spacexdata.com/v3/info"
var apiInfoURL = "https://api.spacexdata.com/v3"
var historicalEventsURL = "https://api.spacexdata.com/v3/history"
var getHistoricEventByID = "https://api.spacexdata.com/v3/history"

document.getElementById("history").addEventListener("click", function () { displayHistory(historyURL) })
document.getElementById("apiInfo").addEventListener("click", function () { displayAPIInfo(apiInfoURL) })
document.getElementById("hisEve").addEventListener("click", function () { displayHistoricalEvents(historicalEventsURL) })
document.getElementById("hisEveById").addEventListener("click", function () { procesdisplayHistoricEvent(getHistoricEventByID) })

//sets location to index.html
function navToHome() {
    location = "index.html"
}

//accepts url parameter
//checks for data in local storage 
//if present, prints it
//if not present brings , stores in local storage and prints it
function displayHistoricalEvents(url) {
    var hisEve = JSON.parse(localStorage.getItem("hisEve"))
    if (hisEve) {
        printHistory(hisEve)
    }
    else {
        var xhr = new XMLHttpRequest()
        xhr.open("GET", url)
        xhr.send()
        xhr.onload = function () {
            if (xhr.status == 200) {
                localStorage.setItem("hisEve", xhr.response)
                printHistory(JSON.parse(xhr.response))
            }
        }
        xhr.onerror = function () {
            console.log("error in xhr with code", xhr.status)
        }
    }

}

//accepts url parameter
//checks for data in local storage 
//if present, prints it
//if not present brings , stores in local storage and prints it
function displayHistory(url) {
    var info = JSON.parse(localStorage.getItem("info"))
    if (info) {
        print(info, false)
    }
    else {
        var xhr = new XMLHttpRequest()
        xhr.open("GET", url)
        xhr.send()
        xhr.onload = function () {
            if (xhr.status == 200) {
                localStorage.setItem("info", xhr.response)
                print(JSON.parse(xhr.response), false)
            }
        }
        xhr.onerror = function () {
            console.log("error in xhr with code", xhr.status)
        }
    }

}

//checks for data in local storage 
//if present, prints it
//if not present brings , stores in local storage and prints it
function displayAPIInfo(url) {
    var apiInfo = JSON.parse(localStorage.getItem("apinfo"))
    if (apiInfo) {
        print(apiInfo, false)
    }
    else {
        var xhr = new XMLHttpRequest()
        xhr.open("GET", url)
        xhr.send()
        xhr.onload = function () {
            if (xhr.status == 200) {
                localStorage.setItem("apinfo", xhr.response)
                print(JSON.parse(xhr.response), false)
            }
        }
        xhr.onerror = function () {
            console.log("error in xhr with code", xhr.status)
        }
    }

}

//accepts data in json format and prints
//if clear is false, clears the container and prints data
//if clear is true, appends data to container
function print(data, clear) {
    var container = document.getElementById("container")
    if (!clear)
        container.innerHTML = ""
    for (key in data) {
        if (data[key] != null && typeof data[key] == "object") {
            var p = document.createElement("p")
            if (!Array.isArray(data)) {
                p.innerHTML = "<h3>" + key + "</h3>"
                container.appendChild(p)
            }
            print(data[key], true)
            continue
        }

        var keyValue = document.createElement("div")
        keyValue.innerHTML = "<p>" + "<span class= \"key\">" + key + ":</span>" + " " + "<span class= \"value\">" + data[key] + "</span>" + "</p>"
        container.append(keyValue)

    }
}

//takes whole data JSON object ,that contains all the history json objects , total number of items per page,required page number to display
//displays contents in given pageNo 
function displayPage(data, perPage, pageNo) {
    var container = document.querySelector("#container")
    container.innerHTML = ""
    createPageLinks(data)
    var ele = document.createElement("div")
    var start = (pageNo - 1) * perPage;
    var end = pageNo * perPage

    for (var i = start; i < end; i++) {
        print(data[i], true)
        container.appendChild(document.createElement("hr"))
    }
    ele.setAttribute("id", "totalHistory")
    document.querySelector("#container").appendChild(ele)
}

//creates numbers, links to corresponding pages
function createPageLinks(data) {
    var tot = data.length / 5 + 1
    for (var i = 1; i < tot; i = i + 1) {
        var div = document.createElement("div")
        div.setAttribute("class", "linkStyle")
        div.innerText = i
        div.addEventListener("click", function () {
            displayPage(data, 5, Number(event.target.innerText))
        })
        container.appendChild(div)
    }
}

//takes data JSON object ,that contains all the history json objects as argument
//displays first page, 
//displays page numbers linked to corresponding pages
function printHistory(data) {
    var container = document.getElementById("container")
    container.innerHTML = ""
    createPageLinks(data)
    displayPage(data, 5, 1)
}

//calls get ID function giving url as parameter
function procesdisplayHistoricEvent(url) {
    getID(url)
}

//takes the url and displays the particular data corresponding to particular id
function displayHistoricEvent(url) {
    var container = document.getElementById("container")
    var id = Number(document.getElementById("eventID").value)
    container.innerHTML = ""
    var hisEve = JSON.parse(localStorage.getItem("hisEve" + "" + id))
    if (hisEve) {
        print(hisEve, false)
    }
    else {
        var xhr = new XMLHttpRequest()
        xhr.open("GET", url + "/" + id)
        xhr.send()
        xhr.onload = function () {
            if (xhr.status == 200) {
                localStorage.setItem("hisEve" + id, xhr.response)
                print(JSON.parse(xhr.response), false)
            }
        }
        xhr.onerror = function () {
            console.log("error in xhr with code", xhr.status)
        }
    }

}

//takes url as argument later modifies it to get particular id
//accepts id from user
//and on submit calls displayHistoricEvent function,modifying the url argument
function getID(url) {
    var div = document.createElement("div")
    var container = document.getElementById("container")
    container.innerHTML = ""
    var input = document.createElement("input")
    input.setAttribute("id", "eventID")
    var label = document.createElement("label")
    label.innerText = "ID"
    div.style.margin = "5%"
    label.appendChild(input)
    var btn = document.createElement("button")
    btn.innerText = "Submit"
    btn.style.margin = "1%"
    btn.addEventListener("click", function () { displayHistoricEvent(url) })
    div.append(label, btn)
    container.append(div)
}