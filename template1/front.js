// ANKI PERSISTENCE
// v1.1.8 - https://github.com/SimonLammer/anki-persistence/blob/584396fea9dea0921011671a47a0fdda19265e62/script.js
if (void 0 === window.Persistence) { var e = "github.com/SimonLammer/anki-persistence/", t = "_default"; if (window.Persistence_sessionStorage = function () { var i = !1; try { "object" == typeof window.sessionStorage && (i = !0, this.clear = function () { for (var t = 0; t < sessionStorage.length; t++) { var i = sessionStorage.key(t); 0 == i.indexOf(e) && (sessionStorage.removeItem(i), t--) } }, this.setItem = function (i, n) { void 0 == n && (n = i, i = t), sessionStorage.setItem(e + i, JSON.stringify(n)) }, this.getItem = function (i) { return void 0 == i && (i = t), JSON.parse(sessionStorage.getItem(e + i)) }, this.removeItem = function (i) { void 0 == i && (i = t), sessionStorage.removeItem(e + i) }, this.getAllKeys = function () { for (var t = [], i = Object.keys(sessionStorage), n = 0; n < i.length; n++) { var s = i[n]; 0 == s.indexOf(e) && t.push(s.substring(e.length, s.length)) } return t.sort() }) } catch (n) { } this.isAvailable = function () { return i } }, window.Persistence_windowKey = function (i) { var n = window[i], s = !1; "object" == typeof n && (s = !0, this.clear = function () { n[e] = {} }, this.setItem = function (i, s) { void 0 == s && (s = i, i = t), n[e][i] = s }, this.getItem = function (i) { return void 0 == i && (i = t), void 0 == n[e][i] ? null : n[e][i] }, this.removeItem = function (i) { void 0 == i && (i = t), delete n[e][i] }, this.getAllKeys = function () { return Object.keys(n[e]) }, void 0 == n[e] && this.clear()), this.isAvailable = function () { return s } }, window.Persistence = new Persistence_sessionStorage, Persistence.isAvailable() || (window.Persistence = new Persistence_windowKey("py")), !Persistence.isAvailable()) { var i = window.location.toString().indexOf("title"), n = window.location.toString().indexOf("main", i); i > 0 && n > 0 && n - i < 10 && (window.Persistence = new Persistence_windowKey("qt")) } }


var isMobile = (document.getElementsByClassName('mobile').length !== 0);
var isDesktop = !isMobile;
var Debug = document.getElementById("multiple-choice-debug");

function init() {
    let choices = parseChoices();
    let buttons = document.getElementsByClassName("multiple-choice-button")
    
    // Check for possible errors
    if (!Persistence.isAvailable())
    {
        log("Persistence not available: multiple choices will not work.");
        return;
    } 
    else if (choices.length < buttons.length)
    {
        log("Not enough choices: You wanted to generate " + buttons.length + " choices yet the field contains " + choices.length + " choices.");
        return;
    }

    // Populate one button with the correct answer. It is assumed that the correct choice is listed first
    let correctButtonIndex = randomInt(0, buttons.length- 1);
    buttons[correctButtonIndex].innerHTML = getChoice(0);
    Persistence.setItem("correctButton", correctButtonIndex);

    // Add event listeners to choice buttons and populate them
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        
        if (isMobile){
            button.addEventListener("touchstart", flipCard);
        } 
        else if (isDesktop) {
            button.addEventListener("click", flipCard);
        }

        if (i !== correctButtonIndex)
            button.innerHTML = getChoice(randomInt(0, choices.length - 1));
        
        // Set a custom index attribute in order to be able to persist the button inside event listeners
        button.setAttribute("Index", i);
        Persistence.setItem(button.getAttribute("Index"), button.innerHTML);
    }

    function getChoice(index) { return choices.splice(index, 1)[0]; }
    function flipCard() {
        Persistence.setItem("choosenButton", this.getAttribute("Index"));
        if (typeof pycmd !== "undefined")
            pycmd("ans");
        else if (typeof AnkiDroidJS !== "undefined")
            showAnswer();
    }
}
init();


// UTILITY FUNCTIONS
function log(text) { if (Debug !== null && Debug != undefined) Debug.innerHTML += text + "<br>";}

function randomInt(start, end) {
    /* Start and end inex are included */
    let result = 0;
    if (end >= start)
        result = Math.floor(Math.random() * (end - start) + start + 0.5);
    return result;
}

function parseChoices() {
    let choices = "{{Choices}}".split("<br>");
    return choices;
}