# Anki-Multiple-Choice

## Introduction
This project is a mix of html, css and javascript that you can add to whichever note type you want and will implement the feature of multiple choices.
It randomizes the choices every time you review your card in order to prevent you from memorizing the position of the correct choice.

## How to use
### Fast setup
You can just download the anki package `example.apkg` and import into anki, and the note types will be imported into your collection.<br>
However, if you already have a note type which you want to turn into multiple choice, you might want to keep reading the manual setup.

### Manual setup
First choose the template you want to use.<br>
You can find more about the difference between the two templates in the templates paragraph.<br>
**Note**: In the following steps you'll have to copy the content of the files inside the `dist` folder and **not** the `src` folder.
The content inside `src` is intended for developement only.

Once you have choosen a template you'll have to do the following:
1. Choose a note type which you want to turn into multiple choice (e.g. "Basic" note type) and add a field named *Choices* to the note type.
This is the field that will contain the multiple choices.
1. Now open the note editor.
1. Add the content of front.html to the front section.
Then, at the end of the card, add a script element (write `<script> </script>`) and paste inside the content of front.js; you can use the minified version to save space.
1. Add the content of back.html to the back section.
Then, at the end of the card, add a script element (write `<script> </script>`) and paste inside the content of back.js; you can use the minified version to save space.
1. Add the content of style.css to the style section.
1. Save the note type.

## Customization
### Changing the number of buttons
This is completely possible. The number of buttons in your card model will determine the number of choices that will pop up in your cards.
For example, if you want only 2 choices, then when copying the content of `front.html` and `back.html`, you'll need to add only 2 of the lines containing the code `<button class="multiple-choice-hidden"><div class="multiple-choice-button">none</div></button>` instead of 4.

### Create a card
The text inside the "Choices" field has to follow a specific format: each choice must be on a separate line[^1] and the one in the first line will be considered the correct one.
[^1]: More specifically they should be `<br>` separated. By default Anki adds the `<br>` tag when you add a new line, but things might go wrong if you, for example, paste text from a webpage. You can check whether the choices follow the right format using Anki's HTML inspector.

Please note that you are not constrainted to inserting the same number of choices as the number of buttons, they can even be more. \
For example, if you have 4 buttons you can add inside the "Choices" field 4,5,6 or more choices: in this case every review the correct choice plus 3 randomly choosen from the remaining (different at every review) will populate the buttons. 

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
In case something goes wrong, a specific error message will be displayed in there.
You can delete it if you want, though I would advise keeping it, as it will always be invisible unless an error occurs.

## Contributing
If you feel like the available templates are missing some features, feel free to improve on them or share your own template by making a pull request.

Otherwise, if you have created a beautiful note type using this library, you may share it here so that others can use it as well.


