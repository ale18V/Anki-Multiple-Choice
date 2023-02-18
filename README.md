# Anki-Multiple-Choice

## Introduction
This project is a mix of html, css and javascript that you can add to whichever note type you want and will implement the feature of multiple choices.
It randomizes the choices every time you review your card in order to prevent you from memorizing the position of the correct choice.

## How to use
First choose the template you want to use.
You can find more about the difference between the two templates in the next section.
Once you have choosen a template you'll have to do the following:
1. Choose a note type which you want to turn into multiple choice (e.g. "Basic" note type) and add a field named "Choices" to the note type (without the quotes).
This is the field that will contain the multiple choices.
1. Now open the note editor.
1. Add the content of front.html to the front section.
Then, at the end of the card, add a script element (write `<script> </script>`) and paste inside the content of front.js; you can use the minified version to save space.
1. Add the content of back.html to the back section.
Then, at the end of the card, add a script element (write `<script> </script>`) and paste inside the content of back.js; you can use the minified version to save space.
1. Add the content of style.css to the style section.
1. Save the note type.

Now you can create multiple-choice cards using this note type. 

**Important:** Each choice that you insert in the "Choices" field must be on a separate line otherwise you won't get the expected result. (More specifically they should be `<br>` separated. If something goes wrong check the field with the html inspector and verify that each choice is separated from the next with the `<br>` tag)

## Templates

### Template1
This template will flip the card when clicking or tapping on a button.
On AnkiMobile (iOS) you need to enable show answer on taps in order for this to work.
You can find this in the review settings.
On AnkiDesktop the card is flipped via `pycmd`.
On AnkiDroid the card is flipped via the javascript api that is offered by the app.
Keep in mind that this template might break in future versions of anki.

### Template2
This template will not flip the card when clicking or tapping on a button.
For this reason, it doesn't require any hacks and is less likely (I would say unlikely) that it will break in future versions of anki, as opposed to the first template. 

## Debug
Both front.html and back.html include the line: `<p id="multiple-choice-debug"></p>`. \
This is because in the case that something goes wrong a specific error message will be displayed inside there.
You can delete it if you want, though I would advise keeping it as it will always be invisible unless an error occurs.


