// Define button event handler function
function flipCard() {
    Persistence.setItem("choosenButton", this.getAttribute("Index"));
    if (typeof pycmd !== "undefined")
        pycmd("ans");
    else if (typeof AnkiDroidJS !== "undefined")
        showAnswer();
}

init(flipCard);