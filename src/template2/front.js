function selectButton() {
    Persistence.setItem("choosenButton", this.getAttribute("Index"));
    for(let currentlySelected of document.getElementsByClassName("multiple-choice-selected")){
        currentlySelected.classList.remove("multiple-choice-selected");
    }
    this.classList.add("multiple-choice-selected");
}

init(selectButton);