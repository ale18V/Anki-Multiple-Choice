// ANKI PERSISTENCE
// v1.1.8 - https://github.com/SimonLammer/anki-persistence/blob/584396fea9dea0921011671a47a0fdda19265e62/script.js
if (void 0 === window.Persistence) { var e = "github.com/SimonLammer/anki-persistence/", t = "_default"; if (window.Persistence_sessionStorage = function () { var i = !1; try { "object" == typeof window.sessionStorage && (i = !0, this.clear = function () { for (var t = 0; t < sessionStorage.length; t++) { var i = sessionStorage.key(t); 0 == i.indexOf(e) && (sessionStorage.removeItem(i), t--) } }, this.setItem = function (i, n) { void 0 == n && (n = i, i = t), sessionStorage.setItem(e + i, JSON.stringify(n)) }, this.getItem = function (i) { return void 0 == i && (i = t), JSON.parse(sessionStorage.getItem(e + i)) }, this.removeItem = function (i) { void 0 == i && (i = t), sessionStorage.removeItem(e + i) }, this.getAllKeys = function () { for (var t = [], i = Object.keys(sessionStorage), n = 0; n < i.length; n++) { var s = i[n]; 0 == s.indexOf(e) && t.push(s.substring(e.length, s.length)) } return t.sort() }) } catch (n) { } this.isAvailable = function () { return i } }, window.Persistence_windowKey = function (i) { var n = window[i], s = !1; "object" == typeof n && (s = !0, this.clear = function () { n[e] = {} }, this.setItem = function (i, s) { void 0 == s && (s = i, i = t), n[e][i] = s }, this.getItem = function (i) { return void 0 == i && (i = t), void 0 == n[e][i] ? null : n[e][i] }, this.removeItem = function (i) { void 0 == i && (i = t), delete n[e][i] }, this.getAllKeys = function () { return Object.keys(n[e]) }, void 0 == n[e] && this.clear()), this.isAvailable = function () { return s } }, window.Persistence = new Persistence_sessionStorage, Persistence.isAvailable() || (window.Persistence = new Persistence_windowKey("py")), !Persistence.isAvailable()) { var i = window.location.toString().indexOf("title"), n = window.location.toString().indexOf("main", i); i > 0 && n > 0 && n - i < 10 && (window.Persistence = new Persistence_windowKey("qt")) } }

var Debug = document.getElementById("multiple-choice-debug");
function init() {

    let buttons = document.getElementsByClassName("multiple-choice-button");

    // Check for possible errors
    if (!Persistence.isAvailable()) {
        log("Persistence not available: multiple choices will not work.");
        return;
    }

    // Recover the text inside front side's buttons
    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        if (Persistence.getItem(i) !== null)
            button.innerHTML = Persistence.getItem(i);
        else {
            log("Button number " + i + " was not persisted.");
            button.innerHTML = "none";
        }
    }

    // Style the choosen and the correct button
    let correctButtonIndex = getCorrectButtonIndex();
    let choosenButtonIndex = getChoosenButtonIndex();
    if (correctButtonIndex !== null) {
        if (choosenButtonIndex !== -1 && choosenButtonIndex !== correctButtonIndex) {
            styleButton(buttons[choosenButtonIndex], "multiple-choice-wrong"); // wrong must be a css class
        }
        styleButton(buttons[correctButtonIndex], "multiple-choice-correct"); // right must be a css class
    }

}
init();
Persistence.clear();



//  UTILITY FUNCTIONS
function log(text) { if (Debug !== null && Debug != undefined) Debug.innerHTML += text + "<br>"; }

function getCorrectButtonIndex() {
    let correct = Persistence.getItem("correctButton");
    if (correct === null) {
        log("Correct answer was not set.");
        correct = -1;
    }
    return correct;
}

function getChoosenButtonIndex() {
    let choosen = Persistence.getItem("choosenButton");
    if (choosen === null)
        choosen = -1;
    return choosen;
}
function styleButton(button, style) {
    button.classList.add(style);
}

